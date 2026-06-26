import { Card, CardContent } from "@/components/ui/card";
import type { Order } from "@/entities/order";
import { formatDate } from "@/shared/utils/format-date";
import { formatPrice } from "@/shared/utils/format-price";
import { cn } from "@/shared/lib/utils";

interface OrderCardProps {
  order: Order;
  onClick?: () => void;
}

export function OrderCard({ order, onClick }: OrderCardProps) {
  const statusColors: Record<Order["status"], string> = {
    cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    preparing: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    completed: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  };

  return (
    <Card
      onClick={onClick}
      className="
        group cursor-pointer transition-colors duration-150 
        hover:bg-accent/60 active:scale-[0.99] border-muted/60
      "
    >
      <CardContent className="p-3 flex flex-col gap-1.5">
        {/* Top Row: Identification & Status */}
        <div className="flex items-center justify-between">
          <span className="font-bold text-base text-card-foreground">
            #{order.order_number}
          </span>
          <span
            className={cn(
              "inline-flex items-center rounded px-2 py-0.5 text-xs font-semibold tracking-wide",
              statusColors[order.status]
            )}
          >
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </div>

        {/* Bottom Row: Metadata & Price */}
        <div className="flex items-end justify-between text-xs text-muted-foreground">
          {/* Metadata inline list */}
          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
            <span>{formatDate(order.created_at)}</span>
            <span>•</span>
            <span className="font-medium text-foreground/90">
              {order.items.length} {order.items.length === 1 ? "item" : "items"}
            </span>
            <span>•</span>
            <span className="capitalize">{order.payment.payment_method}</span>
          </div>
          
          {/* Prominent Price */}
          <span className="text-base font-bold text-foreground shrink-0 pl-2">
            {formatPrice(order.total)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}