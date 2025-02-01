// filepath: /d:/WineCeller/wineseller_website_frontend/src/pages/Payment/CheckoutForm.js
import React, { useState,useEffect } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import './CheckoutForm.css';

const CheckoutForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const navigate = useNavigate();
  const [paymentIntent, setPaymentIntent] = useState(null);

  useEffect(() => {
    const validatePaymentIntent = async () => {
      if (!stripe || !clientSecret) {
        return;
      }

      const { paymentIntent, error } = await stripe.retrievePaymentIntent(clientSecret);

      if (error) {
        setError(`Failed to retrieve payment intent: ${error.message}`);
      } else {
        setPaymentIntent(paymentIntent);
      }
    };

    validatePaymentIntent();
  }, [stripe, clientSecret]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);


    if (!paymentIntent || paymentIntent.status !== 'requires_payment_method') {
      setError('Invalid payment intent status.');
      setProcessing(false);
      return;
    }

    const { error, paymentIntent:confirmedPaymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
      });

    if (error) {
      setError(`Payment failed: ${error.message}`);
      setProcessing(false);
    } else if (paymentIntent.status === 'succeeded') {
      setSucceeded(true);
      setError(null);
      setProcessing(false);
      navigate('/payment-success', { state: { paymentIntent: confirmedPaymentIntent } });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <PaymentElement />
      <button type="submit" disabled={!stripe || processing || succeeded} className="payment-button">
        {processing ? 'Processing...' : 'Pay'}
      </button>
      {error && <div className="payment-error">{error}</div>}
      {succeeded && <div className="payment-success">Payment succeeded!</div>}
    </form>
  );
};

export default CheckoutForm;