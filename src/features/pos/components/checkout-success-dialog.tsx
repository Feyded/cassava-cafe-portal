import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2} from "lucide-react";
import { formatPrice } from "@/shared/utils/format-price";
import { formatDate } from "@/shared/utils/format-date";
import type { Order } from "@/entities/order";

type CheckoutSuccessDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  order: Order | null;
  onNewSale: () => void;
};

export default function CheckoutSuccessDialog({
  isOpen,
  onOpenChange,
  order,
  onNewSale,
}: CheckoutSuccessDialogProps) {
  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="items-center text-center">
          <CheckCircle2 className="h-16 w-16 text-green-500" />
          <DialogTitle className="text-2xl">Transaction Complete</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="rounded-lg border p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order ID</span>
              <span className="font-semibold">#{order.order_number}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Total</span>
              <span className="font-semibold">{formatPrice(order.total)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Received</span>
              <span>{formatPrice(order.payment.received_amount)}</span>
            </div>

            <div className="flex justify-between text-lg">
              <span className="font-medium">Change</span>
              <span className="font-bold text-green-600">
                {formatPrice(order.payment.change_amount)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Date</span>
              <span>{formatDate(order.created_at)}</span>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-row">
          <Button className="w-full" onClick={onNewSale}>
            New Sale
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
