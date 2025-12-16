import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import dotenv from 'dotenv';
import app from './app.js';
import jwt from 'jsonwebtoken';
import User from './models/User.js';
import supportedStocks from './models/Stock.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const allowedOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

const io = new SocketIOServer(server, {
  cors: {
    origin: allowedOrigin,
  },
});

// --- In-memory stock prices ---
let stockPrices = {};
function generateRandomPrices() {
    supportedStocks.forEach(stock => {
        // Prices between 100 and 2000 for demo
        stockPrices[stock] = +(100 + Math.random() * 1900).toFixed(2);
    });
}

generateRandomPrices();
setInterval(() => {
    generateRandomPrices();
    // Broadcast to all users their relevant prices
    io.sockets.sockets.forEach(async (socket) => {
        const { user } = socket;
        if (!user) return;
        // Get user's subscriptions from DB
        const dbUser = await User.findById(user.id);
        if (!dbUser) return;
        const subscriptions = dbUser.subscriptions;
        const prices = {};
        subscriptions.forEach(ticker => {
            if (stockPrices[ticker]) prices[ticker] = stockPrices[ticker];
        });
        socket.emit('stockPrices', prices);
    });
}, 1000);

// --- Authenticate and track user on socket connect ---
io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) {
        return next(new Error('Authentication token missing'));
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.user = decoded;
        next();
    } catch (err) {
        return next(new Error('Authentication failed'));
    }
});

io.on('connection', (socket) => {
    console.log('Client connected:', socket.user?.email);

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.user?.email);
    });
});

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
