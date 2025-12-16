import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import stockRoutes from './routes/stocks.js';

dotenv.config();

const app = express();

// Middleware
const allowedOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

app.use(
  cors({
    origin: allowedOrigin,
  })
);
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Stock Broker API is running' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/stocks', stockRoutes);

mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/escrow_dashboard')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

export default app;
