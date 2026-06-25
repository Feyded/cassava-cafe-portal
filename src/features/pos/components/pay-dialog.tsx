import  { useState } from "react";
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
import { formatPrice } from "@/shared/utils/format-price";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { Modifier } from "@/entities/modifier";
import type { CheckoutPaymentDto } from "../types";


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
  isOpen: boolean;
  isLoading: boolean;
  onCheckout: (payment: CheckoutPaymentDto) => Promise<void>;
  onOpenChange: (open: boolean) => void;
}

export function PayDialog({
  cart,
  isOpen,
  onOpenChange,
  isLoading,
  onCheckout,
}: PayDialogProps) {
  const [amountPaid, setAmountPaid] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "qr" | "card">(
    "cash",
  );
  const [reference, setReference] = useState<string | null>(null);
  const [paymentProvider, setPaymentProvider] = useState<string | null>(null);

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

  const handleChangePayment = (method: "cash" | "qr" | "card") => {
    setPaymentMethod(method);

    setReference(null);
    setPaymentProvider(null);

    if (method === "cash") {
      setAmountPaid("0");
    } else {
      setAmountPaid(totalAmount.toString());
    }
  };

  const handleCheckout = async () => {
    try {
      await onCheckout({
        payment_method: paymentMethod,
        received_amount: parsedAmountPaid,
        reference_number: reference || "",
        payment_provider: paymentProvider || "",
      });
      setAmountPaid("");
    } catch {}
  };

  const isValid = () => {
    if (paymentMethod === "cash" && parsedAmountPaid < totalAmount)
      return false;
    if (paymentMethod === "qr" && (!paymentProvider || !reference))
      return false;
    if (paymentMethod === "card" && (!paymentProvider || !reference))
      return false;
    return true;
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
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 min-h-0 w-full">
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
                  variant={paymentMethod === "cash" ? "default" : "outline"}
                  className="h-20 flex flex-col gap-2 items-center justify-center text-sm font-bold transition-all"
                  onClick={() => handleChangePayment("cash")}
                >
                  <Banknote className="h-6 w-6" />
                  <span>Cash</span>
                </Button>
                <Button
                  type="button"
                  variant={paymentMethod === "card" ? "default" : "outline"}
                  className="h-20 flex flex-col gap-2 items-center justify-center text-sm font-bold transition-all"
                  onClick={() => handleChangePayment("card")}
                >
                  <CreditCard className="h-6 w-6" />
                  <span>Card</span>
                </Button>
                <Button
                  type="button"
                  variant={paymentMethod === "qr" ? "default" : "outline"}
                  className="h-20 flex flex-col gap-2 items-center justify-center text-sm font-bold transition-all"
                  onClick={() => handleChangePayment("qr")}
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

              {paymentMethod === "cash" && (
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

              {paymentMethod === "qr" && (
                <div className="space-y-4 animate-in fade-in-50 duration-200">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block">
                      Payment Provider
                    </Label>
                    <Select
                      required={true}
                      value={paymentProvider || ""}
                      onValueChange={setPaymentProvider}
                    >
                      <SelectTrigger className="w-full h-12 text-base font-medium border-2">
                        <SelectValue placeholder="Select QR Provider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          value="gcash"
                          className="font-semibold py-3 text-base"
                        >
                          GCash
                        </SelectItem>
                        <SelectItem
                          value="maya"
                          className="font-semibold py-3 text-base"
                        >
                          Maya
                        </SelectItem>
                        <SelectItem
                          value="grabpay"
                          className="font-semibold py-3 text-base"
                        >
                          GrabPay
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground block">
                      Reference Number
                    </Label>
                    <Input
                      required={true}
                      type="text"
                      placeholder="Enter reference number"
                      className="h-12 border-2 text-base font-mono"
                      value={reference || ""}
                      onChange={(e) => setReference(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {paymentMethod === "card" && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wide text-muted-foreground block">
                      Payment Provider
                    </label>
                    <Input
                      value={paymentProvider || ""}
                      onChange={(e) => setPaymentProvider(e.target.value)}
                      type="text"
                      placeholder="Enter payment provider"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wide text-muted-foreground block">
                      Reference Number
                    </label>
                    <Input
                      value={reference || ""}
                      onChange={(e) => setReference(e.target.value)}
                      type="text"
                      placeholder="Enter reference number"
                    />
                  </div>
                </>
              )}
            </div>

            {/* 3. Action Processing Button */}
            <DialogFooter className="pt-4 border-t shrink-0">
              <Button
                type="button"
                size="lg"
                className="w-full h-16 text-xl font-black uppercase tracking-wider"
                disabled={isLoading || !isValid()}
                loading={isLoading}
                onClick={handleCheckout}
              >
                Complete Transaction
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
