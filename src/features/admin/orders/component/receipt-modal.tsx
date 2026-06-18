import { Printer, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Order } from "../../../../types/models/order";
import { formatPrice } from "@/utils/format-price";
import { formatDate } from "@/utils/format-date";

interface ReceiptDialogProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
}

export default function ReceiptDialog({
  isOpen,
  onClose,
  order,
}: ReceiptDialogProps) {
  const handlePrint = () => {
    window.print();
  };

  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto print:shadow-none print:border-none print:max-w-full">
        <DialogHeader className="flex flex-col items-center text-center space-y-2">
          <div className="bg-primary/10 p-2.5 rounded-full text-primary print:hidden">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <DialogTitle className="text-xl font-bold tracking-tight">
            Order Receipt
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground uppercase tracking-wider">
            Order ID: #{order.order_number}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground block text-xs">Date</span>
              <span className="font-medium text-foreground">
                {formatDate(order.created_at)}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground block text-xs">
                Payment Method
              </span>
              <span className="font-medium text-foreground">
                {order.payment.payment_method}
              </span>
            </div>
            <div className="col-span-2">
              <span className="text-muted-foreground block text-xs">
                Cashier
              </span>
              <span className="font-medium text-foreground block">
                {order.creator.first_name} {order.creator.last_name}
              </span>
            </div>
          </div>

          <Separator className="my-2" />

          {/* Items Breakdown */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Items Summary
            </h4>
            <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-start text-sm"
                >
                  <div className="space-y-0.5">
                    <p className="font-medium text-foreground pr-4 line-clamp-1">
                      {item.product_name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Qty: {item.quantity} × {formatPrice(item.unit_price)}
                    </p>
                  </div>
                  <span className="font-medium text-foreground shrink-0">
                    {formatPrice(Number(item.unit_price) * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-2" />
          {/* ADD THE CHANGE AMOUNT AND RECEIVED AMOUNT TO THE FINANCIAL TOTALS */}
          {/* Financial Totals */}
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Received Amount</span>
              <span>{formatPrice(order.payment.received_amount)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Change Amount</span>
              <span>{formatPrice(order.payment.change_amount)}</span>
            </div>
            {/* {order.discount_type ? (
              <div className="flex justify-between text-emerald-600 dark:text-emerald-500">
                <span>Discount</span>
                <span>-{formatPrice(order.discount_amount)}</span>
              </div>
            ) : null}
            <div className="flex justify-between text-muted-foreground">
              <span>Tax</span>
              <span>{formatPrice(order.tax)}</span>
            </div> */}
            <Separator className="my-1" />
            <div className="flex justify-between text-base font-semibold text-foreground pt-1">
              <span>Total Paid</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Actions Footer */}
        <DialogFooter className="mt-6 gap-2 sm:gap-0 print:hidden">
          <Button
            variant="outline"
            onClick={handlePrint}
            className="w-full sm:w-auto mr-2"
          >
            <Printer className="mr-2 h-4 w-4" />
            Print Receipt
          </Button>
          <Button onClick={onClose} className="w-full sm:w-auto">
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
