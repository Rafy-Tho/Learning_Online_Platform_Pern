import express from "express";
import Stripe from "stripe";
import ENV from "../configs/Env.js";
import Subscription from "../repositories/SubscriptionRepository.js";

const webhookRoute = express.Router();
const stripe = new Stripe(ENV.STRIPE_SECRET_KEY);

// ⚠️ IMPORTANT: raw body required
webhookRoute.post(
  "/",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        ENV.STRIPE_WEBHOOK_SECRET,
      );
    } catch (err) {
      console.log("Signature failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {
      if (event.type === "checkout.session.completed") {
        const session = event.data.object;

        const userId = session.metadata.userId;
        const subscriptionId = session.metadata.subscriptionId;

        const subscription = await Subscription.findById(subscriptionId);

        if (!subscription) {
          throw new Error("Subscription not found");
        }

        const startDate = new Date();
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + Number(subscription.duration_days));

        const userSubscription = await Subscription.createUserSubscription({
          userId,
          subscriptionPlanId: subscriptionId,
          endDate,
        });

        if (!userSubscription) {
          throw new Error("Failed to create user subscription");
        }

        await Subscription.createPayment({
          userSubscriptionId: userSubscription.id,
          amount: subscription.price,
          stripePaymentIntentId: session.payment_intent,
        });
      }
      // ✅ success
      res.status(200).json({ received: true });
    } catch (err) {
      console.error("Webhook processing error:", err);
      // ❗ IMPORTANT: tell Stripe to retry
      res.status(500).send("Webhook failed");
    }
  },
);

export default webhookRoute;
