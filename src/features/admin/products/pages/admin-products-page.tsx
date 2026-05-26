import { useDeferredValue, useState } from "react";
import useGetProductsQuery from "@/features/admin/products/queries/use-get-products-query";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "../components/columns";

export default function AdminProductPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const deferredSearch = useDeferredValue(search);

  const productsQuery = useGetProductsQuery({
    search: search,
    page,
    limit: limit,
  });

  return (
    <div className="container mx-auto space-y-8 p-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        <p className="text-muted-foreground">
          Review your menu catalog, current availability, and variant pricing.
        </p>
      </div>

      <DataTable
        columns={columns}
        data={productsQuery.data?.data ?? []}
        loading={productsQuery.isFetching}
      />
    </div>
  );
}
