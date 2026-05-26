import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import {
  Coffee,
  LayoutDashboard,
  LogOut,
  Package,
  Menu,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden bg-muted/20">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full"
        } transition-all duration-300 ease-in-out bg-background border-r border-border flex flex-col z-20 md:relative absolute h-full overflow-hidden`}
      >
        <div className="p-6 flex items-center gap-3 shrink-0 min-w-max">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Coffee className="w-6 h-6 text-primary" />
          </div>
          <span className="font-bold text-xl tracking-tight">
            Cassava Admin
          </span>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto min-w-[16rem]">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`
            }
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/inventory-categories"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`
            }
          >
            <LayoutDashboard className="w-5 h-5" />
            Inventory Categories
          </NavLink>

          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`
            }
          >
            <Package className="w-5 h-5" />
            Products
          </NavLink>
        </nav>

        <div className="p-4 mt-auto border-t border-border shrink-0 min-w-[16rem]">
          <Link to="/">
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-foreground"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Exit to Cafe
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col w-full overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 flex items-center justify-between px-6 bg-background border-b border-border z-10 shrink-0">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="outline" size="sm">
                <Home className="w-4 h-4 mr-2" />
                Go to Cafe
              </Button>
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto w-full relative">
          <Outlet />
        </main>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-10 md:hidden block"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
