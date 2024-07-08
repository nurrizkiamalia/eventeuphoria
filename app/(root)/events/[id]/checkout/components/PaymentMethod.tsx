"use client";

import React, { useState } from 'react';

const payment = ["BCA", "BNI", "OVO", "Dana", "Shopee Pay", "Mandiri"];

const PaymentMethod: React.FC = () => {
  const [selectedPayment, setSelectedPayment] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPayment(event.target.value);
  };

  return (
    <div className="flex flex-col gap-3">
      <h3 className=" text-tLg font-semibold">Payment Method List</h3>
      <div>
        {payment.map((item, index) => (
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
