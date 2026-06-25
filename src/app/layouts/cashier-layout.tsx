import { Button } from "@/components/ui/button";
import { ArrowLeft, ReceiptText, ShoppingBasket } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

const items = [
  {
    label: "POS",
    href: "/",
    icon: <ArrowLeft className="size-4" />,
  },
  {
    label: "Orders",
    href: "/cashier/orders",
    icon: <ReceiptText className="size-4" />,
  },
  {
    label: "POS",
    href: "/cashier/pos",
    icon: <ShoppingBasket className="size-4" />,
  },
];

export default function CashierLayout() {
  return (
    <div>
      <div>
        {items.map((item) => (
          <Link key={item.href} to={item.href} className="mb-4 inline-block">
            <Button size="lg" variant="outline">
              {item.icon}
            </Button>
          </Link>
        ))}
      </div>
      <Outlet />
    </div>
  );
}
