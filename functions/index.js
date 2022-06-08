const functions = require('firebase-functions');
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51HReOoBxZFvwuKOr4CVo5R4A6UrOyC06fn3Nx05nzkGTpsSP3CofkFLrEBQ5ToHx9wCH8CmBrXiIoGp6afcJ3GiO00h8yLSBMs");

// Initialise
const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// Routes
app.get("/", (req, res) => res.status(200).send("<h1>Welcome to Oba @Serverless!</h1>"));


// app.post("/payments/create", async (req, res) => {
//     const total = req.query.total;
//     console.log("Payment Request received >>>", total);
//     try {
//     const paymentIntent = await stripe.paymentIntents.create({
//         amount: total,
//         currency: "usd"
//     });
//       return res.status(201).send({
//         clientSecret: paymentIntent.client_secret
//     });
//     } catch(e) {
//         console.log(e.message);
//         return e.message;
//     }
// });

// Listen
exports.api = functions.https.onRequest(app);




// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });