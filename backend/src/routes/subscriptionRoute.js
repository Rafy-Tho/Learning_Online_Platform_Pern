import express from 'express';
import { getSubscription } from '../controllers/subscriptionControllers.js';

const subscriptionRoute = express.Router();

subscriptionRoute.route('/:id').get(getSubscription);

export default subscriptionRoute;
