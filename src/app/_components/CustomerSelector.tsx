"use client";

import React, { useEffect } from "react";
import { api } from "~/trpc/react";

interface Customer {
  id: string;
  name: string;
  contactInfo: string;
}

interface CustomerSelectorProps {
  customerId: string;
  setCustomerId: React.Dispatch<React.SetStateAction<string>>;
  setCustomerInfo: React.Dispatch<React.SetStateAction<Customer | null>>;
}

const CustomerSelector: React.FC<CustomerSelectorProps> = ({
  customerId,
  setCustomerId,
  setCustomerInfo,
}) => {
  const { data: customers, isLoading, error } = api.customer.getAll.useQuery();

  useEffect(() => {
    if (customers) {
      setCustomerInfo(
        customers.find((customer: Customer) => customer.id === customerId) ??
          null,
      );
    }
  }, [customerId, customers, setCustomerInfo]);

  const handleCustomerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCustomerId = e.target.value;
    setCustomerId(selectedCustomerId);
    const selectedCustomer = customers?.find(
      (customer: Customer) => customer.id === selectedCustomerId,
    );
    setCustomerInfo(selectedCustomer ?? null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading customers.</div>;
  }

  return (
    <select
      value={customerId}
      onChange={handleCustomerChange}
      className="w-full rounded border border-gray-300 p-2"
    >
      <option value="" disabled>
        Select Customer
      </option>
      {customers?.map((customer: Customer) => (
        <option key={customer.id} value={customer.id}>
          {customer.name}
        </option>
      ))}
    </select>
  );
};

export default CustomerSelector;
