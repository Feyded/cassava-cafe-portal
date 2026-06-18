import { useCallback, useMemo, useRef, useState } from "react";
import useGetOrdersQuery from "../queries/use-get-orders-query";
import { DataTable } from "@/components/ui/data-table";
import { getColumns } from "../component/columns";
import ReceiptDialog from "../component/receipt-modal";
import type { Order } from "../../../../types/models/order";
import { Input } from "@/components/ui/input";

export default function OrderPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const ordersQuery = useGetOrdersQuery({
    page,
    limit,
    search,
  });

  const handleViewReceipt = useCallback((order: Order) => {
    setSelectedOrder(order);
    setDialogOpen(true);
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    searchTimeout.current = setTimeout(() => {
      setSearch(value);
      setPage(1);
    }, 400);
  };

  const columns = useMemo(
    () => getColumns({ onViewReceipt: handleViewReceipt }),
    [handleViewReceipt],
  );

  return (
    <div className=" mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">
            Review your orders, current status, and payment details.
          </p>
        </div>
      </div>

      <Input placeholder="Search order..." onChange={handleSearchChange} />

      <DataTable
        columns={columns}
        data={ordersQuery.data?.data ?? []}
        loading={ordersQuery.isFetching}
        total={ordersQuery.data?.total ?? 0}
        page={page}
        limit={limit}
        onPageChange={setPage}
        onLimitChange={setLimit}
      />

      <ReceiptDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        order={selectedOrder}
      />
    </div>
  );
}
