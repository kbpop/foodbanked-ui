import { useState } from "react";

type InventoryDetailProps = {
  item: {
    name: string;
    quantity: number;
    category: string;
  };
  auditHistory: Array<{ action: string; detail: string; timestamp: string }>;
  onUpdateStock: (newQuantity: number) => void;
  onRemove: () => void;
  onClose: () => void;
};

export function InventoryDetail({
  item,
  auditHistory,
  onUpdateStock,
  onRemove,
  onClose,
}: InventoryDetailProps) {
  const [draftQuantity, setDraftQuantity] = useState(item.quantity);

  return (
    <div className="inventory-detail-panel" role="dialog" aria-label="Inventory item details">
      <div className="inventory-detail-header">
        <div>
          <p className="detail-eyebrow">Item details</p>
          <h2>{item.name}</h2>
        </div>
        <button className="btn btn-secondary" onClick={onClose}>
          Close
        </button>
      </div>

      <div className="detail-grid">
        <div className="detail-card">
          <h3>Current stock</h3>
          <p className="detail-value">{item.quantity}</p>
          <label>
            Update stock
            <input
              type="number"
              min="0"
              value={draftQuantity}
              onChange={(event) => setDraftQuantity(Number(event.target.value))}
            />
          </label>
          <button className="btn btn-primary" onClick={() => onUpdateStock(draftQuantity)}>
            Save update
          </button>
        </div>

        <div className="detail-card">
          <h3>Audit history</h3>
          <ul className="audit-list">
            {auditHistory.map((entry, index) => (
              <li key={`${entry.timestamp}-${index}`}>
                <strong>{entry.action}</strong>
                <span>{entry.detail}</span>
                <small>{entry.timestamp}</small>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="detail-actions">
        <button className="btn btn-secondary" onClick={onRemove}>
          Remove from inventory
        </button>
      </div>
    </div>
  );
}
