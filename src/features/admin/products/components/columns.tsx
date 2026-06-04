import type { Product } from "@/features/menu/types/product";
import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Props = {
  onEdit: (product: Product) => void;
};

export const createColumns = ({ onEdit }: Props): ColumnDef<Product>[] => [
  {
    accessorKey: "name",
    header: "Product",
    cell: ({ row }) => (
      <div className="min-w-52 space-y-1 whitespace-normal">
        <p className="font-medium text-foreground">{row.original.name}</p>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {row.original.description}
        </p>
      </div>
    ),
  },
  {
    accessorFn: (product) => product.category.name,
    id: "category",
    header: "Category",
    cell: ({ row }) => row.original.category.name,
  },
  {
    accessorFn: (product) => product.variants.length,
    id: "variants",
    header: "Variants",
    cell: ({ row }) => row.original.variants.length,
  },
  {
    accessorFn: (product) => product.is_available,
    id: "is_available",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.is_available ? "success" : "destructive"}>
        {row.original.is_available ? "Available" : "Unavailable"}
      </Badge>
    ),
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(row.original)}
        >
          Edit
        </Button>
      </div>
    ),
  },
];
