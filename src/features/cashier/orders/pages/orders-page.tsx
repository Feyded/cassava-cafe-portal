import type { Order } from "@/entities/order";
import { OrderCard } from "../component/order-card";
import useGetOrdersQuery from "../hooks/use-get-orders-query";
import { useState } from "react";
import ReceiptDialog from "@/features/admin/orders/component/receipt-modal";

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const ordersQuery = useGetOrdersQuery();

  const orders = ordersQuery.data?.data || [];
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {orders.map((order: Order) => (
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
