import type { Order } from "@/entities/order";
import { OrderCard } from "../component/order-card";
import useGetOrdersQuery from "../hooks/use-get-orders-query";
import { useState } from "react";
import ReceiptDialog from "@/features/admin/orders/component/receipt-modal";
import { Skeleton } from "@/components/ui/skeleton";

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const ordersQuery = useGetOrdersQuery();

  const orders = ordersQuery.data?.data || [];

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ordersQuery.isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="space-y-4 rounded-lg border p-4"
            >
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
        ) : (
          orders.map((order: Order) => (
            <OrderCard
              key={order.id}
              order={order}
              onClick={() => {
                setSelectedOrder(order);
                setIsOpen(true);
              }}
            />
          ))
        )}
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