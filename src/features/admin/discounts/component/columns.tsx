import type { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/shared/utils/format-date";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Discount } from "@/entities/discount";

type ColumnsProps = {
  onUpdateDiscount: (discount: Discount) => void;
};

export const getColumns = ({
  onUpdateDiscount,
}: ColumnsProps): ColumnDef<Discount>[] => [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "percentage",
    header: "Percentage",
    cell: ({ row }) => {
      `${row.original.percentage}%`;
    },
  },
  {
    accessorKey: "is_active",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.is_active ? "success" : "destructive"}>
        {row.original.is_active ? "Active" : "Inactive"}
      </Badge>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => formatDate(row.original.created_at),
  },
  {
    header: "Actions",
    cell: ({ row }) => (
      <Button size="sm" onClick={() => onUpdateDiscount(row.original)}>
        Update
      </Button>
    ),
  },
];
