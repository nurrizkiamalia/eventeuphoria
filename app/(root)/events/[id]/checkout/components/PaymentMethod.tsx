'use client';

import React, { useState, useEffect } from 'react';

interface PaymentMethodProps {
  finalPrice: number;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ finalPrice }) => {
  const [selectedPayment, setSelectedPayment] = useState<string>(finalPrice === 0 ? 'Free' : '');

  useEffect(() => {
    if (finalPrice === 0) {
      setSelectedPayment('Free');
    }
  }, [finalPrice]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPayment(event.target.value);
  };

  const paymentMethods = finalPrice === 0 ? ["Free"] : ["BCA", "BNI", "OVO", "Dana", "Shopee Pay", "Mandiri", "Bank Transfer"];

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-tLg font-semibold">Payment Method List</h3>
      <p>Choose your own payment method for this transaction.</p>
      <div>
        {paymentMethods.map((item, index) => (
          <div key={index} className="flex gap-3 text-tMd font-medium">
            <input
              type="radio"
              name="payment"
              value={item}
              id={`payment-${index}`}
              checked={selectedPayment === item}
              onChange={handleChange}
            />
            <label htmlFor={`payment-${index}`}>{item}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethod;
