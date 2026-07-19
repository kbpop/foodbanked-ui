import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Link } from "react-router";
import { flexRender } from "@tanstack/react-table";
import { InventoryActions } from "./InventoryActions";
import { InventoryDetail } from "./InventoryDetail";
import "./Table.css";

type ItemLevel = {
  name: string;
  quantity: number;
  category: string;
};

type AuditEntry = {
  action: string;
  detail: string;
  timestamp: string;
};

type InventoryItem = ItemLevel & {
  auditHistory: AuditEntry[];
};

const defaultdata: InventoryItem[] = [
  {
    name: "Rice",
    quantity: 46,
    category: "Grains",
    auditHistory: [
      { action: "Restocked", detail: "Received 20 units", timestamp: "2026-07-17" },
      { action: "Adjusted", detail: "Inventory counted", timestamp: "2026-07-15" },
    ],
  },
  {
    name: "Canned Beans",
    quantity: 38,
    category: "Proteins",
    auditHistory: [
      { action: "Distributed", detail: "Packed for family outreach", timestamp: "2026-07-18" },
    ],
  },
  {
    name: "Apples",
    quantity: 24,
    category: "Produce",
    auditHistory: [
      { action: "Restocked", detail: "Fresh delivery received", timestamp: "2026-07-16" },
    ],
  },
  {
    name: "Pasta",
    quantity: 19,
    category: "Grains",
    auditHistory: [
      { action: "Low stock alert", detail: "Below target threshold", timestamp: "2026-07-14" },
    ],
  },
  {
    name: "Milk",
    quantity: 15,
    category: "Dairy",
    auditHistory: [
      { action: "Restocked", detail: "Added 8 units", timestamp: "2026-07-13" },
    ],
  },
  {
    name: "Peanut Butter",
    quantity: 12,
    category: "Pantry",
    auditHistory: [
      { action: "Distributed", detail: "Moved to pantry shelf", timestamp: "2026-07-12" },
    ],
  },
];

const columnHelper = createColumnHelper<InventoryItem>();

const cols = [
  columnHelper.accessor("name", {
    header: "Item",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("category", {
    header: "Category",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("quantity", {
    header: "Quantity",
    cell: (info) => info.getValue(),
  }),
];

export const Table = () => {
  const [data, setData] = useState(() => [...defaultdata]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedItemName, setSelectedItemName] = useState<string | null>(null);

  const table = useReactTable({
    data,
    columns: cols,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const totalItems = useMemo(() => data.reduce((sum, item) => sum + item.quantity, 0), [data]);
  const priorityRestocks = useMemo(() => data.filter((item) => item.quantity < 20).length, [data]);
  const selectedItem = data.find((item) => item.name === selectedItemName) ?? null;

  function handleAddItem(item: ItemLevel) {
    setData((current) => [
      { ...item, auditHistory: [{ action: "Added", detail: "New inventory entry", timestamp: "Just now" }] },
      ...current,
    ]);
  }

  function handleUpdateStock(itemName: string, newQuantity: number) {
    setData((current) =>
      current.map((item) =>
        item.name === itemName
          ? {
              ...item,
              quantity: newQuantity,
              auditHistory: [
                {
                  action: "Stock updated",
                  detail: `Quantity changed to ${newQuantity}`,
                  timestamp: "Just now",
                },
                ...item.auditHistory,
              ],
            }
          : item
      )
    );
  }

  function handleRemoveItem(itemName: string) {
    setData((current) => current.filter((item) => item.name !== itemName));
    setSelectedItemName(null);
  }

  return (
    <section id="inventory-page">
      <div className="inventory-shell">
        <div className="inventory-header">
          <div>
            <h1>Food Bank Inventory</h1>
            <p>Stay on top of what’s available for the next distribution day.</p>
          </div>
          <Link to="/" className="btn btn-secondary">
            Back Home
          </Link>
        </div>

        <div className="inventory-summary">
          <div className="summary-card">
            <strong>{data.length}</strong>
            <span>Active items</span>
          </div>
          <div className="summary-card">
            <strong>{totalItems}</strong>
            <span>Total units</span>
          </div>
          <div className="summary-card">
            <strong>{priorityRestocks}</strong>
            <span>Priority restocks</span>
          </div>
        </div>

        <InventoryActions onAddItem={handleAddItem} />

        <div className="inventory-toolbar">
          <input
            aria-label="Search inventory"
            className="inventory-search"
            placeholder="Search by item"
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
          />
          <button className="btn btn-secondary" onClick={() => table.getColumn("name")?.setFilterValue("")}>
            Clear search
          </button>
        </div>

        <div className="inventory-table-wrap">
          <table className="inventory-table">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {header.isPlaceholder ? null : (
                        <button
                          className="table-sort-button"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.getIsSorted() === "asc"
                            ? " ↑"
                            : header.column.getIsSorted() === "desc"
                              ? " ↓"
                              : ""
                          }
                        </button>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={selectedItemName === row.original.name ? "inventory-row-selected" : ""}
                  onClick={() => setSelectedItemName(row.original.name)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedItem && (
          <InventoryDetail
            item={selectedItem}
            auditHistory={selectedItem.auditHistory}
            onUpdateStock={(newQuantity) => handleUpdateStock(selectedItem.name, newQuantity)}
            onRemove={() => handleRemoveItem(selectedItem.name)}
            onClose={() => setSelectedItemName(null)}
          />
        )}
      </div>
    </section>
  );
};
