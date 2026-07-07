import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { flexRender } from "@tanstack/react-table";

type ItemLevel = {
  name: string;
  quantity: number;
};

const defaultdata: ItemLevel[] = [
  {
    name: "Banana",
    quantity: 24,
  },
  {
    name: "Banana",
    quantity: 24,
  },
  {
    name: "Banana",
    quantity: 24,
  },
  {
    name: "Banana",
    quantity: 24,
  },
  {
    name: "Banana",
    quantity: 24,
  },
  {
    name: "Banana",
    quantity: 24,
  },
  {
    name: "Banana",
    quantity: 24,
  },
  {
    name: "Banana",
    quantity: 24,
  },
];

const columnHelper = createColumnHelper<ItemLevel>();

const cols = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("quantity", {
    header: "Quantity",
    cell: (info) => info.getValue(),
  }),
];

export const Table = () => {
  const [data, _setData] = useState(() => [...defaultdata]);
  const table = useReactTable({
    data,
    columns: cols,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
