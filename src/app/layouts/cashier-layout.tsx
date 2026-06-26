import { Button } from "@/components/ui/button";
import { ReceiptText } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

const items = [
  {
    label: "Home",
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
          <NavLink key={item.href} to={item.href} className="mb-4 inline-block">
            {({ isActive }) => (
              <Button size="lg" variant={isActive ? "default" : "ghost"}>
                {isActive}
                {item.label}
              </Button>
            )}
          </NavLink>
        ))}
      </div>
      <div className="p-3">
        <Outlet />
      </div>
    </div>
  );
}
