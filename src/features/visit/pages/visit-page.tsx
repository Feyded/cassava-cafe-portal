import { Skeleton } from "@/components/ui/skeleton";
import StoreContactCard, {
  StoreContactCardSkeleton,
} from "../components/store-contact-card";
import StoreHoursCard, {
  StoreHoursCardSkeleton,
} from "../components/store-hours-card";
import StoreMapEmbed from "../components/store-map-embed";
import { useStoreInfo } from "../hooks/use-store-info";

export default function VisitPage() {
  const { data, isLoading } = useStoreInfo();

  return (
    <div className="flex min-h-screen flex-col">
      <section className="bg-secondary py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Find us
          </p>
            <h1 className="font-heading text-3xl font-semibold leading-snug md:text-4xl">
              Come visit us.
              <br />
              We saved you a seat.
            </h1>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="flex flex-col gap-8 lg:col-span-2">
              {isLoading ? (
                <Skeleton className="h-80 w-full rounded-lg md:h-96" />
              ) : data ? (
                <StoreMapEmbed
                  lat={data.coordinates.lat}
                  lng={data.coordinates.lng}
                  label={data.name}
                />
              ) : null}

              {isLoading ? (
                <StoreContactCardSkeleton />
              ) : data ? (
                <StoreContactCard
                  address={data.address}
                  phone={data.phone}
                  email={data.email}
                />
              ) : null}
            </div>

            <div>
              {isLoading ? (
                <StoreHoursCardSkeleton />
              ) : data ? (
                <StoreHoursCard hours={data.hours} />
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
