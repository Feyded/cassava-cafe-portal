import type { Payment } from "../payment";
import type { User } from "../user";

export interface Order {
  id: number;
  order_number: string;
  status: string;
  discount_id: number | null;
  discount_amount: string | null;
  subtotal: string;
  total: string;
  created_by: number;
  created_at: string;
  updated_at: string;
  items: OrderItem[];
  payment: Payment;
  creator: User;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_variant_id: number;
  product_name: string;
  variant_name: string;
  quantity: number;
  unit_price: string;
  subtotal: string;
  created_at: string;
  updated_at: string;
  modifiers: OrderItemModifier[];
}

export interface OrderItemModifier {
  id: number;
  order_item_id: number;
  modifier_id: number;
  modifier_name: string;
  quantity: number;
  modifier_price: string;
  created_at: string;
  updated_at: string;
}
