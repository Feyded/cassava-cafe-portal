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
};

type Payment = {
  id: number;
  order_id: number;
  payment_method: string;
  amount: string;
  received_amount: string;
  change_amount: string;
  status: string;
  created_at: string;
  updated_at: string;
};
