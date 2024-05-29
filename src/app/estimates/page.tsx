import React from "react";
import EstimateForm from "~/app/_components/EstimateForm";

const EstimatesPage = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Estimates</h1>
      <p>Welcome to the Estimates page!</p>
      <EstimateForm />
    </div>
  );
};

export default EstimatesPage;
