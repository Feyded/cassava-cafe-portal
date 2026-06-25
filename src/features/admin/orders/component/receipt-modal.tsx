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

  const calculateItemTotal = (item: Order["items"][number]) => {
    const basePrice = parseFloat(item.unit_price);
    const modifiersPrice = (item.modifiers || []).reduce(
      (sum, mod) => sum + parseFloat(mod.modifier_price),
      0,
    );
    return (basePrice + modifiersPrice) * item.quantity;
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
            <div>
              <span className="text-muted-foreground block text-xs">
                Cashier
              </span>
              <span className="font-medium text-foreground block">
                {order.creator.first_name} {order.creator.last_name}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground block text-xs">
                Payment Provider
              </span>
              <span className="font-medium text-foreground block">
                {order.payment.payment_provider}
              </span>
            </div>
          </div>

          <Separator className="my-2" />

          {/* Items Breakdown */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Items Summary
            </h4>
            <div className="space-y-4 overflow-y-auto flex-1 pr-2">
              {order && order.items.length > 0 ? (
                order.items.map((item) => (
                  <div
                    key={item.id}
                    className="text-sm border-b border-border/60 pb-3 last:border-0 last:pb-0 block"
                  >
                    <div className="flex justify-between font-semibold items-start gap-4">
                      <span className="break-words text-base">
                        {item.product_name}
                        <span className="text-muted-foreground font-normal text-sm ml-2 bg-muted px-2 py-0.5 rounded">
                          x{item.quantity}
                        </span>
                      </span>
                      <span className="font-mono tabular-nums text-base">
                        {formatPrice(calculateItemTotal(item))}
                      </span>
                    </div>
                    <div className="flex justify-between items-center gap-4 mt-1">
                      <p className="text-xs text-muted-foreground mt-1 italic">
                        {item.variant_name}
                      </p>
                      <span className="font-mono tabular-nums text-xs text-muted-foreground">
                        {formatPrice(parseFloat(item.unit_price))}
                      </span>
                    </div>

                    {item.modifiers && item.modifiers.length > 0 && (
                      <div className="mt-2 pl-3 border-l-2 border-primary/40 space-y-1 block bg-muted/20 py-1 rounded-r">
                        {item.modifiers.map((mod) => (
                          <div
                            key={mod.id}
                            className="text-xs text-muted-foreground flex justify-between items-center pr-2"
                          >
                            <span>+ {mod.modifier_name}</span>
                            <span className="font-mono">
                              {formatPrice(parseFloat(mod.modifier_price))}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No items in cart
                </p>
              )}
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
