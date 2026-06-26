import { Button } from "@/components/ui/button";
import { ArrowLeft, ReceiptText, ShoppingBasket } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

const items = [
  {
    label: "POS",
    href: "/",
  },
  {
    label: "Orders",
    href: "/cashier/orders",
    icon: <ReceiptText className="size-4" />,
  },
  {
    label: "POS",
    href: "/cashier/pos",
  },
];

export default function CashierLayout() {
  return (
    <div>
      <div>
        {items.map((item) => (
          <Link key={item.href} to={item.href} className="mb-4 inline-block">
            <Button size="lg" variant="outline">
              {item.label}
            </Button>
          </Link>
        ))}
      </div>
      <Outlet />
    </div>
  );
}
