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

export type CheckoutPaymentDto = {
  payment_method: "cash" | "qr" | "card";
  received_amount: number;
  reference_number: string;
  payment_provider: string;
};

export type CreateCheckoutDto = {
  received_amount: number;
  discount_id: number | null;
  items: {
    variant_id: number;
    quantity: number;
    modifiers: {
      modifier_id: number;
      quantity: number;
    }[];
  }[];
};
