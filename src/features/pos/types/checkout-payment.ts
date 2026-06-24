export type CheckoutPaymentPayload = {
    payment_method: "cash" | "qr" | "card";
    received_amount: number;
    reference_number: string;
    payment_provider: string;
  };