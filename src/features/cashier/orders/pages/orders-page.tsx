import type { Order } from "@/entities/order";
import { OrderCard } from "../component/order-card";
import useGetOrdersQuery from "../hooks/use-get-orders-query";
import { useRef, useState } from "react";
import ReceiptDialog from "@/features/admin/orders/component/receipt-modal";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarIcon, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/shared/lib/utils";
import { Calendar } from "@/components/ui/calendar";

export default function OrdersPage() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const ordersQuery = useGetOrdersQuery({
    page,
    limit: 10,
    search,
    date,
  });

  const orders = ordersQuery.data?.data || [];
  const lastPage = ordersQuery.data?.last_page || 1;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    searchTimeout.current = setTimeout(() => {
      setSearch(value);
      setPage(1);
    }, 400);
  };

  const handlePage = (number: number) => {
    setPage((prev) => prev + number);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:gap-2">
        <div className="relative w-full sm:max-w-md mb-5">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search order by ID..."
            className="pl-9 h-10 w-full bg-background border"
            onChange={handleSearchChange}
          />
        </div>
        <Popover open={showCalendar} onOpenChange={setShowCalendar}>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              size="sm"
              className={cn(
                "w-[260px] justify-start text-left font-normal h-9 rounded-md min-h-[44px] md:min-h-0 mb-2 sm:mb-0", // Larger tap target on mobile, sleek on desktop
                !date && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? date.toLocaleDateString() : "Select date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => {
                if (d) setDate(d);
                setShowCalendar(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ordersQuery.isFetching ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="space-y-4 rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-16" />
              </div>

              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />

              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>

              <div className="flex justify-end">
                <Skeleton className="h-9 w-28" />
              </div>
            </div>
          ))
        ) : orders.length === 0 ? (
          <div className="col-span-full flex items-center justify-center py-12">
            <p className="text-muted-foreground">No orders found.</p>
          </div>
        ) : (
          orders.map((order: Order) => (
            <OrderCard
              key={order.id}
              order={order}
              onClick={() => {
                setSelectedOrder(order);
                setIsOpen(true);
              }}
            />
          ))
        )}
      </div>

      <div className="mt-2">
        <div className="flex justify-end ">
          <Button disabled={page <= 1} onClick={() => handlePage(-1)}>
            Previous
          </Button>
          <Button disabled={page >= lastPage} onClick={() => handlePage(1)}>
            Next{" "}
          </Button>
        </div>
      </div>

      <ReceiptDialog
        isOpen={isOpen}
        order={selectedOrder}
        onClose={() => {
          setSelectedOrder(null);
          setIsOpen(false);
        }}
      />
    </div>
  );
}
