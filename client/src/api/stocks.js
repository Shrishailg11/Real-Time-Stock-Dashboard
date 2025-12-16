import axios from 'axios';

const API_BASE =
  import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

function authHeaders() {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export async function fetchSupportedStocks() {
  return axios.get(`${API_BASE}/stocks/list`, authHeaders());
}

export async function fetchSubscriptions() {
  return axios.get(`${API_BASE}/stocks/subscriptions`, authHeaders());
}

export async function updateSubscription(ticker, subscribe) {
  return axios.post(
    `${API_BASE}/stocks/subscribe`,
    { ticker, subscribe },
    authHeaders()
  );
}