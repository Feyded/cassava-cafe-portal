import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ShoppingBag, ChevronRight } from "lucide-react";
import type { Order } from "@/entities/order";
import { formatDate } from "@/shared/utils/format-date";
import { formatPrice } from "@/shared/utils/format-price";

interface OrderCardProps {
  order: Order;
  onClick?: () => void;
}

export function OrderCard({ order, onClick }: OrderCardProps) {
  const statusColors: Record<Order["status"], string> = {
    Pending:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    Preparing:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    Ready:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
    Completed:
      "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400",
  };

  return (
    <Card
      onClick={onClick}
      className="
        group cursor-pointer transition-all duration-200
        hover:-translate-y-1 hover:shadow-lg
        active:scale-[0.98]
      "
    >
      <CardContent className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Order No.
            </p>

            <h3 className="mt-1 text-lg font-bold">
              #{order.order_number}
            </h3>
          </div>

          <Badge
            className={`border-0 font-semibold ${statusColors[order.status]}`}
          >
            {order.status}
          </Badge>
        </div>

        {/* Details */}
        <div className="mt-5 space-y-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{formatDate(order.created_at)}</span>
          </div>

          <div className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" />
            <span>
              {order.items.length}{" "}
              {order.items.length === 1 ? "item" : "items"}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between border-t pt-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Total
            </p>

            <p className="text-2xl font-bold text-primary">
              {formatPrice(order.total)}
            </p>
          </div>

          <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
        </div>
      </CardContent>
    </Card>
  );
}