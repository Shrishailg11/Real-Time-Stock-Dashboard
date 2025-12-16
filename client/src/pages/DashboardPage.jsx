import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import {
  fetchSupportedStocks,
  fetchSubscriptions,
  updateSubscription,
} from '../api/stocks.js';

export default function DashboardPage() {
  const [supportedStocks, setSupportedStocks] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        const [stocksRes, subsRes] = await Promise.all([
          fetchSupportedStocks(),
          fetchSubscriptions(),
        ]);
        setSupportedStocks(stocksRes.data.stocks || []);
        setSubscriptions(subsRes.data.subscriptions || []);
      } catch (err) {
        setApiError(
          err.response?.data?.message || 'Failed to load stock data'
        );
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const socketUrl =
    import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

    const socket = io(socketUrl, {
      auth: { token },
    });

    socket.on('connect', () => {
      console.log('Socket connected');
    });

    socket.on('stockPrices', (data) => {
      // data: { GOOG: 123.45, TSLA: 456.78, ... }
      setPrices(data);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    socket.on('connect_error', (err) => {
      console.error('Socket connect_error:', err.message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleToggleSubscription = async (ticker, isSubscribed) => {
    try {
      const res = await updateSubscription(ticker, !isSubscribed);
      setSubscriptions(res.data.subscriptions || []);
    } catch (err) {
      alert(
        err.response?.data?.message ||
          `Failed to update subscription for ${ticker}`
      );
    }
  };

  const isSubscribed = (ticker) => subscriptions.includes(ticker);

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto' }}>
      <h2>Stock Dashboard</h2>

      {apiError && (
        <div style={{ color: 'red', marginBottom: 12 }}>{apiError}</div>
      )}

      {loading ? (
        <p>Loading stocks...</p>
      ) : (
        <>
          <section style={{ marginBottom: 24 }}>
            <h3>Available Stocks</h3>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                marginTop: 8,
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      borderBottom: '1px solid #ccc',
                      textAlign: 'left',
                      padding: 8,
                    }}
                  >
                    Ticker
                  </th>
                  <th
                    style={{
                      borderBottom: '1px solid #ccc',
                      textAlign: 'left',
                      padding: 8,
                    }}
                  >
                    Subscribed
                  </th>
                  <th
                    style={{
                      borderBottom: '1px solid #ccc',
                      textAlign: 'left',
                      padding: 8,
                    }}
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {supportedStocks.map((ticker) => {
                  const subscribed = isSubscribed(ticker);
                  return (
                    <tr key={ticker}>
                      <td style={{ padding: 8 }}>{ticker}</td>
                      <td style={{ padding: 8 }}>
                        {subscribed ? 'Yes' : 'No'}
                      </td>
                      <td style={{ padding: 8 }}>
                        <button
                          onClick={() =>
                            handleToggleSubscription(ticker, subscribed)
                          }
                          style={{
                            padding: '4px 10px',
                            borderRadius: 4,
                            border: '1px solid #5461f7',
                            background: subscribed ? '#fff' : '#5461f7',
                            color: subscribed ? '#5461f7' : '#fff',
                            cursor: 'pointer',
                          }}
                        >
                          {subscribed ? 'Unsubscribe' : 'Subscribe'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>

          <section>
            <h3>Live Prices (Subscribed)</h3>
            {subscriptions.length === 0 ? (
              <p>Subscribe to at least one stock to see live prices.</p>
            ) : (
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  marginTop: 8,
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        borderBottom: '1px solid #ccc',
                        textAlign: 'left',
                        padding: 8,
                      }}
                    >
                      Ticker
                    </th>
                    <th
                      style={{
                        borderBottom: '1px solid #ccc',
                        textAlign: 'left',
                        padding: 8,
                      }}
                    >
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions.map((ticker) => (
                    <tr key={ticker}>
                      <td style={{ padding: 8 }}>{ticker}</td>
                      <td style={{ padding: 8 }}>
                        {prices[ticker] !== undefined
                          ? `$${prices[ticker]}`
                          : 'Waiting...'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        </>
      )}
    </div>
  );
}