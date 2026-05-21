import useLogoutMutation from "@/features/auth/queries/use-logout-mutation";
import useMeQuery from "@/features/me/queries/use-me-query";
import { Coffee } from "lucide-react";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Menu", href: "menu" },
  { label: "Visit Us", href: "visit" },
];

export default function Navbar() {
  const me = useMeQuery();

  const logout = useLogoutMutation();

    return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <Coffee className="size-4" />
          <span className="font-heading text-base font-semibold tracking-wider">
            Cassava Café
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                to={link.href}
                className="text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
          {me.data ? (
            <li key="Logout">
              <button
                onClick={() => logout.mutate()}
                className="text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
              >
                Logout
              </button>
            </li>
          ) : (
            <li key="Login">
              <Link
                to="/login"
                className="text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
