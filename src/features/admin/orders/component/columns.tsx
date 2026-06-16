import type { ColumnDef } from "@tanstack/react-table";
import type { Order } from "../types/order";
import { formatPrice } from "@/utils/format-price";
import { formatDate } from "@/utils/format-date";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type ColumnsProps = {
  onViewReceipt: (order: Order) => void;
};

export const getColumns = ({
  onViewReceipt,
}: ColumnsProps): ColumnDef<Order>[] => [
  {
    accessorKey: "order_number",
    header: "Order Number",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant={
          row.original.status === "completed"
            ? "success"
            : row.original.status === "pending"
              ? "ghost"
              : "destructive"
        }
      >
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "payment.received_amount",
    header: "Received",
    cell: ({ row }) => `${formatPrice(row.original.payment.received_amount)}`,
  },
  {
    accessorKey: "payment.amount",
    header: "Total",
    cell: ({ row }) => `${formatPrice(row.original.payment.amount)}`,
  },
  {
    accessorKey: "created_at",
    header: "Order Date",
    cell: ({ row }) => formatDate(row.original.created_at),
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
