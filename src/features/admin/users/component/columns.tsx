import type { ColumnDef } from "@tanstack/react-table";
import type { User } from "../types/user";
import { formatDate } from "@/utils/format-date";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type ColumnsProps = {
  onViewReceipt: (user: User) => void;
};

export const getColumns = ({
  onViewReceipt,
}: ColumnsProps): ColumnDef<User>[] => [
  {
    header: "Name",
    cell: ({ row }) => {
      const { first_name, middle_name, last_name } = row.original;
      return `${first_name} ${middle_name ? middle_name + " " : ""}${last_name}`;
    },
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => formatDate(row.original.created_at),
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
    header: "Actions",
    cell: ({ row }) => (
      <Button size="sm" onClick={() => onViewReceipt(row.original)}>
        View Receipt
      </Button>
    ),
  },
];
