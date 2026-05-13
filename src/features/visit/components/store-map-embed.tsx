import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

interface StoreMapEmbedProps {
  lat: number;
  lng: number;
  label: string;
}

export default function StoreMapEmbed({ lat, lng, label }: StoreMapEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const delta = 0.0019;
  const bbox = `${lng - delta},${lat - delta},${lng + delta},${lat + delta}`;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;

  return (
    <div className="relative h-80 w-full overflow-hidden rounded-lg ring-1 ring-foreground/5 md:h-96">
      {!isLoaded && <Skeleton className="absolute inset-0 h-full w-full" />}
      <iframe
        title={`Map showing ${label}`}
        src={src}
        className="h-full w-full border-0"
        onLoad={() => setIsLoaded(true)}
        loading="lazy"
        referrerPolicy="no-referrer"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}
