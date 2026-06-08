import { DataTable } from "@/components/ui/data-table";
import useGetProductQuery from "../queries/use-get-product-query";
import useGetProductVariantsQuery from "../queries/use-get-product-variants-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import type { ColumnDef } from "@tanstack/react-table";
import type { Variant } from "@/features/menu/types/product";
import { formatPrice } from "@/utils/format-price";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ProductDetailsPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { id } = useParams();

  const product = useGetProductQuery(Number(id));

  const productVariants = useGetProductVariantsQuery({
    limit,
    page,
    productId: Number(id),
  });

  const columns: ColumnDef<Variant>[] = [
    {
      accessorKey: "name",
      header: "Variant",
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => formatPrice(row.original.price),
    },
  ];

  return (
    <div>
      <DataTable
        columns={columns}
        data={productVariants.data?.data ?? []}
        loading={productVariants.isFetching}
        total={productVariants.data?.total}
        page={page}
        onPageChange={setPage}
        onLimitChange={setLimit}
        limit={limit}
      />
    </div>
  );
}
