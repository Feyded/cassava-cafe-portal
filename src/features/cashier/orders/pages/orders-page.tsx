import type { Order } from "@/entities/order";
import { OrderCard } from "../component/order-card";
import useGetOrdersQuery from "../hooks/use-get-orders-query";
import { useRef, useState } from "react";
import ReceiptDialog from "@/features/admin/orders/component/receipt-modal";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const ordersQuery = useGetOrdersQuery({
    page,
    limit: 10,
    search,
  });

  const orders = ordersQuery.data?.data || [];

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

  return (
    <div>
      {/* Search Input */}
      <div className="relative w-full sm:max-w-md mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search order by ID..."
          className="pl-9 h-10 w-full bg-background"
          onChange={handleSearchChange}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ordersQuery.isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="space-y-4 rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-5 w-16" />
                </div>

                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />

                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>

                <div className="flex justify-end">
                  <Skeleton className="h-9 w-28" />
                </div>
              </div>
            ))
          : orders.map((order: Order) => (
              <OrderCard
                key={order.id}
                order={order}
                onClick={() => {
                  setSelectedOrder(order);
                  setIsOpen(true);
                }}
              />
            ))}
      </div>

      <ReceiptDialog
        isOpen={isOpen}
        order={selectedOrder}
        onClose={() => {
          setSelectedOrder(null);
          setIsOpen(false);
        }}
      />
    </div>
  );
}
