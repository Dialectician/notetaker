"use client";

import React from "react";

interface CustomerFormProps {
  customerId: string;
  setCustomerId: React.Dispatch<React.SetStateAction<string>>;
  customerName: string;
  setCustomerName: React.Dispatch<React.SetStateAction<string>>;
  contactInfo: string;
  setContactInfo: React.Dispatch<React.SetStateAction<string>>;
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  billingPreferences: string;
  setBillingPreferences: React.Dispatch<React.SetStateAction<string>>;
  specialInstructions: string;
  setSpecialInstructions: React.Dispatch<React.SetStateAction<string>>;
}

const CustomerForm: React.FC<CustomerFormProps> = ({
  customerId,
  setCustomerId,
  customerName,
  setCustomerName,
  contactInfo,
  setContactInfo,
  address,
  setAddress,
  billingPreferences,
  setBillingPreferences,
  specialInstructions,
  setSpecialInstructions,
}) => {
  return (
    <div className="space-y-4">
      <input
        type="text"
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
        placeholder="Customer ID"
        className="w-full rounded border border-gray-300 p-2"
        readOnly
      />
      <input
        type="text"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        placeholder="Customer Name"
        className="w-full rounded border border-gray-300 p-2"
      />
      <input
        type="text"
        value={contactInfo}
        onChange={(e) => setContactInfo(e.target.value)}
        placeholder="Contact Information"
        className="w-full rounded border border-gray-300 p-2"
      />
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Address"
        className="w-full rounded border border-gray-300 p-2"
      />
      <input
        type="text"
        value={billingPreferences}
        onChange={(e) => setBillingPreferences(e.target.value)}
        placeholder="Billing Preferences"
        className="w-full rounded border border-gray-300 p-2"
      />
      <textarea
        value={specialInstructions}
        onChange={(e) => setSpecialInstructions(e.target.value)}
        placeholder="Special Instructions"
        className="h-20 w-full rounded border border-gray-300 p-2"
      />
    </div>
  );
};

export default CustomerForm;
