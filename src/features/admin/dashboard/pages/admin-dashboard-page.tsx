import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, CheckCircle, DollarSign, CalendarIcon } from "lucide-react";
import useGetDashboardQuery from "../queries/use-get-dashboard-query";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPrice } from "@/utils/format-price";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AdminDashboardPage() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const dashboardQuery = useGetDashboardQuery(date);

  return (
    <div className="container mx-auto space-y-8">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Overview of your cafe's performance.
          </p>
        </div>
        <Popover open={showCalendar} onOpenChange={setShowCalendar}>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              size="sm"
              className={cn(
                "w-[260px] justify-start text-left font-normal h-9 rounded-md min-h-[44px] md:min-h-0", // Larger tap target on mobile, sleek on desktop
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
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {dashboardQuery.isFetching ? (
              <Skeleton className="h-6 w-12" />
            ) : (
              <div className="text-2xl font-bold">
                {dashboardQuery.data?.total_orders ?? 0}
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-1">Orders as of {date ? date.toLocaleDateString() : "N/A"}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {dashboardQuery.isFetching ? (
              <Skeleton className="h-6 w-12" />
            ) : (
              <div className="text-2xl font-bold">
                {formatPrice(dashboardQuery.data?.total_sales ?? 0)}
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-1">Sales as of {date ? date.toLocaleDateString() : "N/A"}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Items Sold</CardTitle>
            <CheckCircle className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            {dashboardQuery.isFetching ? (
              <Skeleton className="h-6 w-12" />
            ) : (
              <div className="text-2xl font-bold">
                {dashboardQuery.data?.total_items_sold ?? 0}
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Items sold as of {date ? date.toLocaleDateString() : "N/A"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Average Order Value
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {dashboardQuery.isFetching ? (
              <Skeleton className="h-6 w-12" />
            ) : (
              <div className="text-2xl font-bold">
                {formatPrice(dashboardQuery.data?.average_order_value ?? 0)}
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Average order value as of {date ? date.toLocaleDateString() : "N/A"}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
