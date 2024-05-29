"use client";

import React from "react";

interface Item {
  description: string;
  quantity: number;
  unitPrice: number;
  dimensions?: string;
  materials?: string;
  finishes?: string;
}

interface ItemListFormProps {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  handleItemChange: (
    index: number,
    key: keyof Item,
    value: string | number,
  ) => void;
}

const ItemListForm: React.FC<ItemListFormProps> = ({
  items,
  setItems,
  handleItemChange,
}) => {
  const addItem = () => {
    setItems([...items, { description: "", quantity: 1, unitPrice: 1 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="space-y-2 rounded border p-2">
          <div className="flex space-x-2">
            <input
              type="text"
              value={item.description}
              onChange={(e) =>
                handleItemChange(index, "description", e.target.value)
              }
              placeholder="Item Description"
              className="flex-1 rounded border border-gray-300 p-2"
            />
            <input
              type="number"
              value={item.quantity}
              onChange={(e) =>
                handleItemChange(index, "quantity", Number(e.target.value))
              }
              placeholder="Quantity"
              className="w-20 rounded border border-gray-300 p-2"
            />
            <input
              type="number"
              value={item.unitPrice}
              onChange={(e) =>
                handleItemChange(index, "unitPrice", Number(e.target.value))
              }
              placeholder="Unit Price"
              className="w-20 rounded border border-gray-300 p-2"
            />
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="w-20 rounded bg-red-500 p-2 text-white"
            >
              Remove
            </button>
          </div>
          <input
            type="text"
            value={item.dimensions ?? ""}
            onChange={(e) =>
              handleItemChange(index, "dimensions", e.target.value)
            }
            placeholder="Dimensions"
            className="w-full rounded border border-gray-300 p-2"
          />
          <input
            type="text"
            value={item.materials ?? ""}
            onChange={(e) =>
              handleItemChange(index, "materials", e.target.value)
            }
            placeholder="Materials"
            className="w-full rounded border border-gray-300 p-2"
          />
          <input
            type="text"
            value={item.finishes ?? ""}
            onChange={(e) =>
              handleItemChange(index, "finishes", e.target.value)
            }
            placeholder="Finishes"
            className="w-full rounded border border-gray-300 p-2"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="mt-2 rounded-md bg-blue-500 px-4 py-2 text-white"
      >
        Add Item
      </button>
    </div>
  );
};

export default ItemListForm;
