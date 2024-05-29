"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { api } from "~/trpc/react";
import CustomerSelector from "./CustomerSelector";
import ItemListForm from "./ItemListForm";
import EstimateNotesForm from "./EstimateNotesForm";

interface Item {
  description: string;
  quantity: number;
  unitPrice: number;
  dimensions?: string;
  materials?: string;
  finishes?: string;
}

interface Customer {
  id: string;
  name: string;
  contactInfo: string;
}

const EstimateForm: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [customerId, setCustomerId] = useState<string>("");
  const [customerInfo, setCustomerInfo] = useState<Customer | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [notes, setNotes] = useState<string>("");
  const [terms, setTerms] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);
  const [taxRate, setTaxRate] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      setCustomerId(session.user.id);
    }
  }, [status, session]);

  useEffect(() => {
    // Calculate total cost whenever items, discount, or tax rate change
    const calculateTotalCost = () => {
      const subtotal = items.reduce(
        (acc, item) => acc + item.quantity * item.unitPrice,
        0,
      );
      const total = subtotal - discount + (subtotal * taxRate) / 100;
      setTotalCost(total);
    };

    calculateTotalCost();
  }, [items, discount, taxRate]);

  const createEstimate = api.estimate.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setCustomerId("");
      setCustomerInfo(null);
      setItems([]);
      setNotes("");
      setTerms("");
      setDiscount(0);
      setTaxRate(0);
      setTotalCost(0);
      setAttachedFiles([]);
    },
  });

  const handleItemChange = (
    index: number,
    key: keyof Item,
    value: string | number,
  ) => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      const currentItem = newItems[index];

      if (currentItem) {
        newItems[index] = {
          ...currentItem,
          [key]: value,
        };
      }
      return newItems;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const estimateData = {
      customerId,
      items,
      notes,
      terms,
      discount,
      taxRate,
      totalCost,
      attachedFiles,
    };

    try {
      createEstimate.mutate(estimateData);
    } catch (error) {
      console.error("Error creating estimate:", error);
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div>Please log in to create an estimate.</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CustomerSelector
        customerId={customerId}
        setCustomerId={setCustomerId}
        setCustomerInfo={setCustomerInfo}
      />
      {customerInfo && (
        <div className="rounded border bg-gray-100 p-4">
          <p>
            <strong>Name:</strong> {customerInfo.name}
          </p>
          <p>
            <strong>Contact:</strong> {customerInfo.contactInfo}
          </p>
        </div>
      )}
      <ItemListForm
        items={items}
        setItems={setItems}
        handleItemChange={handleItemChange}
      />
      <EstimateNotesForm
        notes={notes}
        setNotes={setNotes}
        terms={terms}
        setTerms={setTerms}
        discount={discount}
        setDiscount={setDiscount}
        taxRate={taxRate}
        setTaxRate={setTaxRate}
        totalCost={totalCost}
        attachedFiles={attachedFiles}
        setAttachedFiles={setAttachedFiles}
      />
      <button
        type="submit"
        className="mt-1 rounded-md bg-green-500 px-4 py-2 text-white shadow-sm"
      >
        Create Estimate
      </button>
    </form>
  );
};

export default EstimateForm;
