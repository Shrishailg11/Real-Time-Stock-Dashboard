import express from 'express';
import { listStocks, getUserSubscriptions, updateSubscriptions } from '../controllers/stockController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// List supported stocks
router.get('/list', auth, listStocks);
// Get user's subscriptions
router.get('/subscriptions', auth, getUserSubscriptions);
// Subscribe/Unsubscribe
router.post('/subscribe', auth, updateSubscriptions);

export default router;
