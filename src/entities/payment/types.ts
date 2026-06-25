export interface Payment {
  id: number;
  order_id: number;
  payment_method: "cash" | "card" | "qr";
  amount: string;
  received_amount: string;
  change_amount: string;
  status: string;
  paid_at: string;
  payment_provider: string | null;
  reference_number: string | null;
  created_at: string;
  updated_at: string;
}
