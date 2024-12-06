import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./App.css";

const stripePromise = loadStripe("pk_test_51QREzbGzvn2xju5ejFTJzqm2HX3RZiyDBbbxT8EIVB568UB72NlPYlMb8yYhekEnP0ChNpzbWzh4lz1oGhA7iLo000G3mPnGlv");

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [email, setEmail] = useState("");
    const [amount, setAmount] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [clientSecret, setClientSecret] = useState("");

    const fetchClientSecret = async () => {
        try {
            const response = await fetch("http://localhost:5000/create-payment-intent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ amount }), 
            });

            const data = await response.json();
            if (data.success) {
                setClientSecret(data.clientSecret);
            } else {
                setMessage(`Error: ${data.error}`);
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("Processing...");

        if (!clientSecret) {
            setMessage("Client secret not available. Please try again.");
            return;
        }

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    email,
                },
            },
        });

        if (error) {
            setMessage(`Payment failed: ${error.message}`);
        } else {
            setMessage(`Payment successful! PaymentIntent ID: ${paymentIntent.id}`);
        }
    };

    const handleAmountChange = (e) => {
        const newAmount = e.target.value;
        setAmount(newAmount); 
        fetchClientSecret(); 
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <h2>Stripe Payment Gateway</h2>
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                />
            </label>
            <label>
                Amount (in Paisa):
                <input
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                    placeholder="Enter amount in Paisa"
                    required
                />
            </label>
            <CardElement />
            <label className="name">
                Name on Card:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter card holder Name"
                    required
                />
            </label>
            <button type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p>{message}</p>
        </form>
    );
};

function App() {
    return (
        <div className="App">
            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        </div>
    );
}

export default App;
