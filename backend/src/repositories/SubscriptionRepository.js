import pgPool from "../configs/database.js";

class SubscriptRepository {
  async findById(id) {
    const result = await pgPool.query(
      "SELECT * FROM subscription_plans WHERE id = $1",
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
  async getActivePaidSubscription(userId) {
    const result = await pgPool.query(
      `SELECT 
        us.id AS subscription_id,
        us.user_id,
        us.plan_id,
        us.start_date,
        us.end_date,
        us.status AS subscription_status,
        us.created_at AS subscription_created_at,
        us.updated_at AS subscription_updated_at,
        sp.id AS payment_id,
        sp.amount,
        sp.payment_status,
        sp.stripe_payment_intent_id,
        sp.created_at AS payment_created_at,
        p.id AS plan_id_ref,
        p.name,
        p.duration_days,
        p.price,
        p.created_at AS plan_created_at
     FROM user_subscriptions us
     JOIN subscription_plans p 
       ON us.plan_id = p.id
     JOIN subscription_payments sp 
       ON sp.user_subscription_id = us.id
     WHERE us.user_id = $1
       AND us.status = 'ACTIVE'
       AND us.end_date > NOW()
       AND sp.payment_status = 'COMPLETED'
     ORDER BY sp.created_at DESC
     LIMIT 1`,
      [userId],
    );

    return result.rows[0];
  }

  async setUserSubscriptionStatusToExpired(userId) {
    const result = await pgPool.query(
      `UPDATE user_subscriptions
     SET status = 'EXPIRED'
     WHERE user_id = $1`,
      [userId],
    );

    return result.rows[0];
  }

  async findAllPlans() {
    const result = await pgPool.query(
      "SELECT * FROM subscription_plans ORDER BY created_at DESC",
    );
    return result.rows;
  }

  async createPlan({ name, durationDays, price }) {
    const result = await pgPool.query(
      `INSERT INTO subscription_plans (name, duration_days, price)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, durationDays, price],
    );
    return result.rows[0];
  }

  async updatePlan(id, { name, durationDays, price }) {
    const result = await pgPool.query(
      `UPDATE subscription_plans
       SET name = $1, duration_days = $2, price = $3
       WHERE id = $4
       RETURNING *`,
      [name, durationDays, price, id],
    );
    return result.rows[0];
  }

  async deletePlan(id) {
    const result = await pgPool.query(
      "DELETE FROM subscription_plans WHERE id = $1 RETURNING id",
      [id],
    );
    return result.rows[0];
  }

  async findAllUserSubscriptions() {
    const result = await pgPool.query(
      `SELECT us.*, u.name AS user_name, u.email AS user_email, sp.name AS plan_name
       FROM user_subscriptions us
       JOIN users u ON us.user_id = u.id
       JOIN subscription_plans sp ON us.plan_id = sp.id
       ORDER BY us.created_at DESC`,
    );
    return result.rows;
  }

  async AdminCreateUserSubscription({
    userId,
    planId,
    startDate,
    endDate,
    status,
  }) {
    const result = await pgPool.query(
      `INSERT INTO user_subscriptions (user_id, plan_id, start_date, end_date, status)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [userId, planId, startDate, endDate, status || "ACTIVE"],
    );
    return result.rows[0];
  }

  async updateUserSubscription(
    id,
    { userId, planId, startDate, endDate, status },
  ) {
    const result = await pgPool.query(
      `UPDATE user_subscriptions
       SET user_id = $1, plan_id = $2, start_date = $3, end_date = $4, status = $5
       WHERE id = $6
       RETURNING *`,
      [userId, planId, startDate, endDate, status, id],
    );
    return result.rows[0];
  }

  async deleteUserSubscription(id) {
    const result = await pgPool.query(
      "DELETE FROM user_subscriptions WHERE id = $1 RETURNING id",
      [id],
    );
    return result.rows[0];
  }

  async findAllPayments() {
    const result = await pgPool.query(
      `SELECT sp.*, u.name AS user_name, u.email AS user_email, pl.name AS plan_name
       FROM subscription_payments sp
       JOIN user_subscriptions us ON sp.user_subscription_id = us.id
       JOIN users u ON us.user_id = u.id
       JOIN subscription_plans pl ON us.plan_id = pl.id
       ORDER BY sp.created_at DESC`,
    );
    return result.rows;
  }

  async AdminCreatePayment({
    userSubscriptionId,
    amount,
    paymentStatus,
    stripePaymentIntentId,
  }) {
    const result = await pgPool.query(
      `INSERT INTO subscription_payments (user_subscription_id, amount, payment_status, stripe_payment_intent_id)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [
        userSubscriptionId,
        amount,
        paymentStatus || "COMPLETED",
        stripePaymentIntentId || null,
      ],
    );
    return result.rows[0];
  }

  async updatePayment(id, { amount, paymentStatus, stripePaymentIntentId }) {
    const result = await pgPool.query(
      `UPDATE subscription_payments
       SET amount = $1, payment_status = $2, stripe_payment_intent_id = $3
       WHERE id = $4
       RETURNING *`,
      [amount, paymentStatus, stripePaymentIntentId || null, id],
    );
    return result.rows[0];
  }

  async deletePayment(id) {
    const result = await pgPool.query(
      "DELETE FROM subscription_payments WHERE id = $1 RETURNING id",
      [id],
    );
    return result.rows[0];
  }
}

const Subscription = new SubscriptRepository();
export default Subscription;
