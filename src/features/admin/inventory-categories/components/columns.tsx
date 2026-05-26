import type { Product } from "@/features/menu/types/product";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "created_at",
    id: "category",
    header: "Category",
    cell: ({ row }) => row.original.category.name,
  },
  {
    id: "action",
    header: "Action",
    cell: () => (
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          Edit
        </Button>
      </div>
    ),
  },
];
