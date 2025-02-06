const functions = require("firebase-functions");
const stripe = require("stripe")(functions.config().stripe.secret);

exports.stripeWebhook = functions.https.onRequest((req, res) => {
    const endpointSecret = functions.config().stripe.webhook_secret;
    const sig = req.headers["stripe-signature"];

    try {
        const event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);

        if (event.type === "payment_intent.succeeded") {
            const paymentIntent = event.data.object;
            const amount = (paymentIntent.amount_received / 100).toFixed(2);
            const donorEmail = paymentIntent.receipt_email || "Anonymous";

            console.log(`${donorEmail} donated $${amount}`);
            res.json({ message: `${donorEmail} donated $${amount}` });
        }
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
    }
});
