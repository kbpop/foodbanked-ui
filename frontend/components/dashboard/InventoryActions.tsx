import { useState } from "react";
import "./InventoryActions.css";

type InventoryActionsProps = {
  onAddItem: (item: { name: string; quantity: number; category: string }) => void;
};

export function InventoryActions({ onAddItem }: InventoryActionsProps) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("Pantry");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim()) return;

    onAddItem({ name: name.trim(), quantity, category });
    setName("");
    setQuantity(1);
    setCategory("Pantry");
  }

  return (
    <form className="inventory-form" onSubmit={handleSubmit}>
      <div className="inventory-form-grid">
        <label>
          Item name
          <input value={name} onChange={(event) => setName(event.target.value)} required />
        </label>
        <label>
          Quantity
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(event) => setQuantity(Number(event.target.value))}
          />
        </label>
        <label>
          Category
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            <option value="Pantry">Pantry</option>
            <option value="Produce">Produce</option>
            <option value="Dairy">Dairy</option>
            <option value="Proteins">Proteins</option>
            <option value="Grains">Grains</option>
          </select>
        </label>
      </div>
      <button type="submit" className="btn btn-primary">
        Add item
      </button>
    </form>
  );
}
