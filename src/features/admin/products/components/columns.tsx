import type { Product } from "@/features/menu/types/product";
import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { envConfig } from "@/env";

type Props = {
  onEdit: (product: Product) => void;
};

export const createColumns = ({ onEdit }: Props): ColumnDef<Product>[] => [
  {
    accessorKey: "name",
    header: "Product",
    cell: ({ row }) => (
      <div className="flex items-start gap-2">
        <Avatar>
          <AvatarImage
            src={
              envConfig.VITE_API_BASE_URL.split("/api")[0] +
              "/storage/" +
              row.original.image_path
            }
            alt={row.original.name}
            className="grayscale"
          />
          <AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="min-w-52 space-y-1 whitespace-normal">
          <p className="font-medium text-foreground">{row.original.name}</p>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {row.original.description}
          </p>
        </div>
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
