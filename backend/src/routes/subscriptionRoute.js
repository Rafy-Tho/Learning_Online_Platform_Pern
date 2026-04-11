import express from 'express';
import {
  getSubscription,
  getUserActiveSubscriptions,
} from '../controllers/subscriptionControllers.js';
import requireAuth from '../middlewares/requireAuth.js';

const subscriptionRoute = express.Router();
subscriptionRoute.get('/user-active', requireAuth, getUserActiveSubscriptions);
subscriptionRoute.route('/:id').get(getSubscription);

export default subscriptionRoute;
