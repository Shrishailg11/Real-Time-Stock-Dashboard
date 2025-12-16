import User from '../models/User.js';
import supportedStocks from '../models/Stock.js';

// List supported stocks
export const listStocks = (req, res) => {
    return res.status(200).json({ stocks: supportedStocks });
};

// User's subscriptions
export const getUserSubscriptions = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        return res.status(200).json({ subscriptions: user.subscriptions });
    } catch (err) {
        return res.status(500).json({ message: 'Server error' });
    }
};

// Subscribe/Unsubscribe to a stock
export const updateSubscriptions = async (req, res) => {
    const { ticker, subscribe } = req.body; // subscribe: true=add, false=remove
    if (!supportedStocks.includes(ticker)) {
        return res.status(400).json({ message: 'Stock not supported' });
    }
    try {
        let user = await User.findById(req.user.id);
        // Add
        if (subscribe && !user.subscriptions.includes(ticker)) {
            user.subscriptions.push(ticker);
        }
        // Remove
        if (!subscribe && user.subscriptions.includes(ticker)) {
            user.subscriptions = user.subscriptions.filter(s => s !== ticker);
        }
        await user.save();
        return res.status(200).json({ subscriptions: user.subscriptions });
    } catch (err) {
        return res.status(500).json({ message: 'Server error' });
    }
};
