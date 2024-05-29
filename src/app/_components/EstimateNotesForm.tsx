"use client";

import React from "react";

interface EstimateNotesFormProps {
  notes: string;
  setNotes: React.Dispatch<React.SetStateAction<string>>;
  terms: string;
  setTerms: React.Dispatch<React.SetStateAction<string>>;
  discount: number;
  setDiscount: React.Dispatch<React.SetStateAction<number>>;
  taxRate: number;
  setTaxRate: React.Dispatch<React.SetStateAction<number>>;
  totalCost: number;
  attachedFiles: File[];
  setAttachedFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const EstimateNotesForm: React.FC<EstimateNotesFormProps> = ({
  notes,
  setNotes,
  terms,
  setTerms,
  discount,
  setDiscount,
  taxRate,
  setTaxRate,
  totalCost,
  //attachedFiles,
  setAttachedFiles,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachedFiles(Array.from(e.target.files));
    }
  };

  return (
    <div className="space-y-4">
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Notes"
        className="h-20 w-full rounded border border-gray-300 p-2"
      />
      <textarea
        value={terms}
        onChange={(e) => setTerms(e.target.value)}
        placeholder="Terms"
        className="h-20 w-full rounded border border-gray-300 p-2"
      />
      <div className="flex space-x-2">
        <input
          type="number"
          value={discount}
          onChange={(e) => setDiscount(Number(e.target.value))}
          placeholder="Discount"
          className="flex-1 rounded border border-gray-300 p-2"
        />
        <input
          type="number"
          value={taxRate}
          onChange={(e) => setTaxRate(Number(e.target.value))}
          placeholder="Tax Rate"
          className="flex-1 rounded border border-gray-300 p-2"
        />
      </div>
      <input
        type="file"
        onChange={handleFileChange}
        multiple
        className="w-full rounded border border-gray-300 p-2"
      />
      <div className="text-right">
        <strong>Total Cost: </strong>${totalCost.toFixed(2)}
      </div>
    </div>
  );
};

export default EstimateNotesForm;
