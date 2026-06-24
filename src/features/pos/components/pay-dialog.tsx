import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wallet, Banknote, CreditCard, ShoppingCart } from "lucide-react";
import { formatPrice } from "@/utils/format-price";

export type Modifier = {
  id: number;
  modifier_group_id: number;
  name: string;
  price: string;
  created_at: string;
  updated_at: string;
};

export type CartItem = {
  id: string;
  product_id: number;
  variant_id: number;
  product_name: string;
  variant_name: string;
  quantity: number;
  price: string;
  modifiers: Modifier[] | [];
};

interface PayDialogProps {
  cart: CartItem[];
  onCompletePayment: (
    paymentMethod: string,
    amountPaid: number,
    change: number,
  ) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PayDialog({
  cart,
  isOpen,
  onOpenChange,
  onCompletePayment,
}: PayDialogProps) {
  const [paymentMethod, setPaymentMethod] = useState<
    "CASH" | "CARD" | "WALLET"
  >("CASH");
  const [amountPaid, setAmountPaid] = useState<string>("");

  const calculateItemTotal = (item: CartItem) => {
    const basePrice = parseFloat(item.price) || 0;
    const modifiersPrice = (item.modifiers || []).reduce(
      (sum, mod) => sum + (parseFloat(mod.price) || 0),
      0,
    );
    return (basePrice + modifiersPrice) * item.quantity;
  };

  const totalAmount = (cart || []).reduce(
    (sum, item) => sum + calculateItemTotal(item),
    0,
  );
  const parsedAmountPaid = parseFloat(amountPaid) || 0;
  const changeDue = parsedAmountPaid - totalAmount;

  const handleQuickCash = (amount: number) => {
    setAmountPaid(amount.toString());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parsedAmountPaid < totalAmount && paymentMethod === "CASH") return;
    onCompletePayment(paymentMethod, parsedAmountPaid, Math.max(0, changeDue));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-[96vw] md:max-w-5xl lg:max-w-6xl h-[90vh] md:h-[80vh] max-h-[850px] p-0 gap-0 overflow-hidden bg-background text-foreground flex flex-col">
        {/* Header */}
        <DialogHeader className="p-5 border-b shrink-0">
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <ShoppingCart className="h-6 w-6 text-muted-foreground" />
            Checkout Payment
          </DialogTitle>
        </DialogHeader>

        {/* Master Form Layout */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-12 flex-1 min-h-0 w-full"
        >
          {/* LEFT PANEL: Extra Wide Order Breakdown */}
          <div className="md:col-span-5 bg-muted/30 p-6 border-b md:border-b-0 md:border-r flex flex-col min-h-0">
            <h3 className="font-bold text-xs uppercase tracking-wider text-muted-foreground mb-4 shrink-0">
              Review Order ({cart?.length || 0} items)
            </h3>

            {/* Scrollable Container */}
            <div className="space-y-4 overflow-y-auto flex-1 pr-2">
              {cart && cart.length > 0 ? (
                cart.map((item) => (
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
                        {formatPrice(parseFloat(item.price))}
                      </span>
                    </div>

                    {item.modifiers && item.modifiers.length > 0 && (
                      <div className="mt-2 pl-3 border-l-2 border-primary/40 space-y-1 block bg-muted/20 py-1 rounded-r">
                        {item.modifiers.map((mod) => (
                          <div
                            key={mod.id}
                            className="text-xs text-muted-foreground flex justify-between items-center pr-2"
                          >
                            <span>+ {mod.name}</span>
                            <span className="font-mono">
                              {formatPrice(parseFloat(mod.price))}
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

          {/* RIGHT PANEL: Payment & Actions */}
          <div className="md:col-span-7 p-6 flex flex-col justify-between overflow-y-auto">
            {/* 1. Method Selector */}
            <div className="space-y-3">
              <label className="text-sm font-bold uppercase tracking-wide text-muted-foreground block">
                Payment Method
              </label>
              <div className="grid grid-cols-3 gap-3">
                <Button
                  type="button"
                  variant={paymentMethod === "CASH" ? "default" : "outline"}
                  className="h-20 flex flex-col gap-2 items-center justify-center text-sm font-bold transition-all"
                  onClick={() => setPaymentMethod("CASH")}
                >
                  <Banknote className="h-6 w-6" />
                  <span>Cash</span>
                </Button>
                <Button
                  type="button"
                  variant={paymentMethod === "CARD" ? "default" : "outline"}
                  className="h-20 flex flex-col gap-2 items-center justify-center text-sm font-bold transition-all"
                  onClick={() => setPaymentMethod("CARD")}
                >
                  <CreditCard className="h-6 w-6" />
                  <span>Card</span>
                </Button>
                <Button
                  type="button"
                  variant={paymentMethod === "WALLET" ? "default" : "outline"}
                  className="h-20 flex flex-col gap-2 items-center justify-center text-sm font-bold transition-all"
                  onClick={() => setPaymentMethod("WALLET")}
                >
                  <Wallet className="h-6 w-6" />
                  <span>E-Wallet</span>
                </Button>
              </div>
            </div>

            {/* 2. Numbers & Calculators */}
            <div className="space-y-4 my-auto py-4">
              <div className="bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900 p-5 rounded-xl flex justify-between items-center shadow-inner">
                <span className="text-base font-bold uppercase tracking-wider opacity-80">
                  Total Payable:
                </span>
                <span className="text-4xl font-black font-mono">
                  {formatPrice(totalAmount)}
                </span>
              </div>

              {paymentMethod === "CASH" && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wide text-muted-foreground block">
                      Amount Tendered
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-4 text-2xl font-bold text-muted-foreground">
                        ₱
                      </span>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        className="text-3xl h-16 font-black text-right pl-10 pr-4 tracking-wide bg-background border-2"
                        value={amountPaid}
                        onChange={(e) => setAmountPaid(e.target.value)}
                        autoFocus
                        required
                      />
                    </div>
                  </div>

                  {/* Cash suggestions helper */}
                  <div className="grid grid-cols-4 gap-2">
                    {[Math.ceil(totalAmount), 5, 10, 20, 50, 100].map(
                      (amt, idx) => {
                        const cashSuggestion = idx === 0 ? amt : amt;
                        if (cashSuggestion < totalAmount && idx !== 0)
                          return null;
                        return (
                          <Button
                            key={idx}
                            type="button"
                            variant="secondary"
                            className="h-12 text-base font-black font-mono border"
                            onClick={() => handleQuickCash(cashSuggestion)}
                          >
                            {formatPrice(cashSuggestion)}
                          </Button>
                        );
                      },
                    )}
                  </div>

                  {/* Dynamic Change Due box */}
                  <div
                    className={`p-5 rounded-xl flex justify-between items-center border transition-colors ${
                      changeDue >= 0
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                        : "bg-destructive/10 border-destructive/30 text-destructive"
                    }`}
                  >
                    <span className="text-sm font-bold uppercase tracking-wider">
                      {changeDue >= 0 ? "Change Due:" : "Amount Remaining:"}
                    </span>
                    <span className="text-3xl font-black font-mono">
                      {formatPrice(changeDue)}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* 3. Action Processing Button */}
            <DialogFooter className="pt-4 border-t shrink-0">
              <Button
                type="submit"
                size="lg"
                className="w-full h-16 text-xl font-black uppercase tracking-wider"
                disabled={paymentMethod === "CASH" && changeDue < 0}
              >
                Complete Transaction
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
