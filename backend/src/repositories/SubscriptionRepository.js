import pgPool from '../configs/database.js';

class SubscriptRepository {
  async findById(id) {
    const result = await pgPool.query(
      'SELECT * FROM subscription_plans WHERE id = $1',
      [id],
    );
    return result.rows[0];
  }

  async createUserSubscription({ userId, subscriptionPlanId, endDate }) {
    const result = await pgPool.query(
      `INSERT INTO user_subscriptions (user_id, plan_id, end_date, status)
       VALUES ($1, $2, $3, 'ACTIVE')
       RETURNING *`,
      [userId, subscriptionPlanId, endDate],
    );
    return result.rows[0];
  }

  async createPayment({ userSubscriptionId, amount, stripePaymentIntentId }) {
    const result = await pgPool.query(
      `INSERT INTO subscription_payments 
       (user_subscription_id, amount, stripe_payment_intent_id, payment_status)
       VALUES ($1, $2, $3, 'COMPLETED')
       RETURNING *`,
      [userSubscriptionId, amount, stripePaymentIntentId],
    );
    return result.rows[0];
  }
}

const Subscription = new SubscriptRepository();
export default Subscription;
