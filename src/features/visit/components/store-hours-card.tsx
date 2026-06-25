import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/shared/lib/utils";
import type { StoreHours } from "../data/store-info";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

interface StoreHoursCardProps {
  hours: StoreHours[];
}

export default function StoreHoursCard({ hours }: StoreHoursCardProps) {
  const todayIndex = new Date().getDay();
  const todayName = DAYS[todayIndex];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hours</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-0 px-8">
        {hours.map((entry, i) => {
          const isToday = entry.day === todayName;
          return (
            <div key={entry.day}>
              <div
                className={cn(
                  "flex items-center justify-between py-3.5 text-sm",
                  isToday && "font-semibold text-foreground",
                  !isToday && "text-muted-foreground"
                )}
              >
                <span>{entry.day}</span>
                {entry.isClosed ? (
                  <span className="text-xs font-semibold uppercase tracking-widest">
                    Closed
                  </span>
                ) : (
                  <span>
                    {entry.open} – {entry.close}
                  </span>
                )}
              </div>
              {i < hours.length - 1 && <Separator />}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

export function StoreHoursCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-4 w-16" />
      </CardHeader>
      <CardContent className="flex flex-col gap-0 px-8">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i}>
            <div className="flex items-center justify-between py-3.5">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>
            {i < 6 && <Separator />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
