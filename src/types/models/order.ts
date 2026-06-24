export type Order = {
  id: number;
  order_number: string;
  status: string;
  discount_type: string | null;
  discount_amount: string | null;
  subtotal: string;
  total: string;
  created_by: number;
  created_at: string;
  updated_at: string;
  items: OrderItems[];
  payment: Payment;
  creator: Creator;
};

type OrderItems = {
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
};

type OrderItemModifier = {
  id: number;
  order_item_id: number;
  modifier_id: number;
  modifier_name: string;
  quantity: number;
  modifier_price: string;
  created_at: string;
  updated_at: string;
};

type Payment = {
  id: number;
  order_id: number;
  payment_method: string;
  amount: string;
  received_amount: string;
  change_amount: string;
  status: string;
  paid_at: string;
  payment_provider: string | null;
  reference_number: string | null;
  created_at: string;
  updated_at: string;
};

type Creator = {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  email_verified_at: string | null;
  role: string;
  created_at: string;
  updated_at: string;
};
