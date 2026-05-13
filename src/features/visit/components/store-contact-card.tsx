import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Mail, MapPin, Phone } from "lucide-react";

interface ContactItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}

interface StoreContactCardProps {
  address: string;
  phone: string;
  email: string;
}

export default function StoreContactCard({
  address,
  phone,
  email,
}: StoreContactCardProps) {
  const items: ContactItem[] = [
    {
      icon: <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />,
      label: "Address",
      value: address,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`,
    },
    {
      icon: <Phone className="size-4 shrink-0 text-muted-foreground" />,
      label: "Phone",
      value: phone,
      href: `tel:${phone.replace(/\s/g, "")}`,
    },
    {
      icon: <Mail className="size-4 shrink-0 text-muted-foreground" />,
      label: "Email",
      value: email,
      href: `mailto:${email}`,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-0 px-8">
        {items.map((item, i) => (
          <div key={item.label}>
            <a
              href={item.href}
              target={item.label === "Address" ? "_blank" : undefined}
              rel={item.label === "Address" ? "noopener noreferrer" : undefined}
              className="group flex items-start gap-3 py-4"
            >
              {item.icon}
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {item.label}
                </span>
                <span className="text-sm leading-relaxed transition-colors group-hover:text-primary">
                  {item.value}
                </span>
              </div>
            </a>
            {i < items.length - 1 && <Separator />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function StoreContactCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-4 w-20" />
      </CardHeader>
      <CardContent className="flex flex-col gap-0 px-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i}>
            <div className="flex items-start gap-3 py-4">
              <Skeleton className="mt-0.5 size-4 shrink-0" />
              <div className="flex flex-col gap-1.5">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
            {i < 2 && <Separator />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
