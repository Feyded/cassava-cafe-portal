import type { ColumnDef } from "@tanstack/react-table";
import type { User } from "../types/user";
import { formatDate } from "@/utils/format-date";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type ColumnsProps = {
  onUpdateUser: (user: User) => void;
};

export const getColumns = ({
  onUpdateUser,
}: ColumnsProps): ColumnDef<User>[] => [
  {
    header: "Name",
    cell: ({ row }) => {
      const { first_name, middle_name, last_name } = row.original;
      return `${first_name} ${middle_name ? middle_name + " " : ""}${last_name}`;
    },
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "email",
    header: "Email",
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
      <Button size="sm" onClick={() => onUpdateUser(row.original)}>
        Update
      </Button>
    ),
  },
];
