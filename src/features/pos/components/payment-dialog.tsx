import React, { useState, useEffect } from "react";
import {
  CreditCard,
  Banknote,
  QrCode,
  X,
  ReceiptText,
  CheckCircle2,
} from "lucide-react";
import { formatPrice } from "@/utils/format-price";

interface PaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
  onPaymentSuccess: () => void; // Clears cart and resets state in parent
}

type PaymentMethod = "cash" | "card" | "qr";
type CheckoutStep = "payment" | "success";

export default function PaymentDialog({
  isOpen,
  onClose,
  totalAmount,
  onPaymentSuccess,
}: PaymentDialogProps) {
  const [step, setStep] = useState<CheckoutStep>("payment");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [amountReceived, setAmountReceived] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Automatically set exact amount when cash is selected
  useEffect(() => {
    if (isOpen) {
      setStep("payment");
      setPaymentMethod("cash");
      setAmountReceived(totalAmount.toFixed(2));
    }
  }, [isOpen, totalAmount]);

  if (!isOpen) return null;

  // Calculate change due
  const cashReceivedNum = parseFloat(amountReceived) || 0;
  const changeDue = Math.max(0, cashReceivedNum - totalAmount);
  const isAmountSufficient = cashReceivedNum >= totalAmount;

  // Quick cash shortcuts
  const generateQuickCashOptions = () => {
    const options = [totalAmount];
    const nextFive = Math.ceil(totalAmount / 5) * 5;
    const nextTen = Math.ceil(totalAmount / 10) * 10;

    if (nextFive > totalAmount) options.push(nextFive);
    if (nextTen > nextFive) options.push(nextTen);
    if (!options.includes(100) && totalAmount < 100) options.push(100);

    return Array.from(new Set(options)); // Remove duplicates
  };

  const handleProcessPayment = () => {
    if (!isAmountSufficient) return;

    setIsProcessing(true);

    // Simulate API call / payment gateway integration
    setTimeout(() => {
      setIsProcessing(false);
      setStep("success");
    }, 1500);
  };

  const handleCompleteFlow = () => {
    onPaymentSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            {step === "payment" ? "Complete Payment" : "Transaction Complete"}
          </h2>
          {step === "payment" && !isProcessing && (
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-50 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1">
          {step === "payment" ? (
            <div className="space-y-6">
              {/* Grand Total Banner */}
              <div className="p-5 text-center bg-gray-50 border border-gray-100 rounded-2xl">
                <span className="text-sm font-semibold tracking-wider text-gray-500 uppercase">
                  Amount Due
                </span>
                <div className="mt-1 text-4xl font-black text-gray-900">
                  {formatPrice(totalAmount)}
                </div>
              </div>
              <div className="p-4 border border-gray-200 bg-white rounded-xl space-y-4 animate-fadeIn">
                <div>
                  <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide mb-2">
                    Amount Received (₱)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    disabled={isProcessing}
                    value={amountReceived}
                    onChange={(e) => setAmountReceived(e.target.value)}
                    className="w-full px-4 py-3 text-2xl font-bold text-gray-900 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
                    placeholder="0.00"
                  />
                </div>

                {/* Quick Cash Shortcuts */}
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Quick Tender Shortcuts
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {generateQuickCashOptions().map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        disabled={isProcessing}
                        onClick={() => setAmountReceived(amt.toFixed(2))}
                        className="flex-1 min-w-[70px] py-2.5 px-3 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-800 font-bold rounded-lg text-sm transition-colors text-center border border-gray-200/60"
                      >
                        {amt === totalAmount ? "Exact" : `$${amt}`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Real-time Change Indicator */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <span className="font-semibold text-gray-600">
                    Change Due:
                  </span>
                  <span
                    className={`text-xl font-black ${isAmountSufficient ? "text-green-600" : "text-red-500"}`}
                  >
                    {isAmountSufficient
                      ? formatPrice(changeDue)
                      : "Insufficient Amount"}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* Success Screen Layout */
            <div className="flex flex-col items-center justify-center text-center py-4 space-y-6 animate-scaleIn">
              <div className="p-3 bg-green-50 rounded-full text-green-500">
                <CheckCircle2 className="w-16 h-16" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-gray-900">Success!</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Payment processed successfully
                </p>
              </div>

              {paymentMethod === "cash" && (
                <div className="w-full p-4 bg-green-50/50 border border-green-100 rounded-2xl">
                  <span className="text-xs font-bold uppercase tracking-wider text-green-700">
                    Change to Give
                  </span>
                  <div className="text-4xl font-black text-green-600 mt-0.5">
                    {formatPrice(changeDue)}
                  </div>
                </div>
              )}

              {/* Quick Receipt Workflow Actions */}
              <div className="w-full space-y-2 pt-2">
                <button className="w-full flex items-center justify-center gap-2 py-3 border border-gray-300 font-bold rounded-xl text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors">
                  <ReceiptText className="w-5 h-5" />
                  Print Customer Receipt
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Action Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50/50">
          {step === "payment" ? (
            <button
              onClick={handleProcessPayment}
              disabled={
                isProcessing ||
                (paymentMethod === "cash" && !isAmountSufficient)
              }
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-600/10 active:transform active:scale-[0.99] transition-all flex items-center justify-center min-h-[56px]"
            >
              {isProcessing ? (
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                `Confirm ${formatPrice(totalAmount)} Payment`
              )}
            </button>
          ) : (
            <button
              onClick={handleCompleteFlow}
              className="w-full py-4 bg-gray-900 hover:bg-black text-white font-bold text-lg rounded-xl shadow-md transition-colors"
            >
              Start New Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
