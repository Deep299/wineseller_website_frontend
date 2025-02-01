// filepath: /d:/WineCeller/wineseller_website_frontend/src/pages/Payment/PaymentSuccess.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const PaymentSuccess = () => {
  const location = useLocation();
  const { paymentIntent } = location.state || {};

  return (
    <div>
      <h2>Payment Success</h2>
      {paymentIntent ? (
        <div>
          <p>Payment Intent ID: {paymentIntent.id}</p>
          <p>Amount: {paymentIntent.amount}</p>
          <p>Status: {paymentIntent.status}</p>
        </div>
      ) : (
        <p>No payment details found.</p>
      )}
    </div>
  );
};

export default PaymentSuccess;