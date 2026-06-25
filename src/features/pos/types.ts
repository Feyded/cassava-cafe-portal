import type { Modifier } from "@/entities/modifier";

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

export type CheckoutPaymentPayload = {
    payment_method: "cash" | "qr" | "card";
    received_amount: number;
    reference_number: string;
    payment_provider: string;
  };