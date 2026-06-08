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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatFileUrl } from "@/utils/format-file-url";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

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
    {
      id: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => alert(row.original)}
          >
            Edit
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      {product.isFetching ? (
        <Card className="w-full mb-2 border-border/70">
          <CardHeader>
            <Skeleton className="h-24 w-full" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-2/3 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
        </Card>
      ) : (
        <Card className="overflow-hidden mb-5">
          <div className="flex flex-col sm:flex-row">
            {/* Product Image */}
            {product.data?.image_path && (
              <div className="sm:ml-2 relative rounded-md w-full sm:w-48 h-48 sm:h-auto bg-muted flex-shrink-0">
                <img
                  src={
                    product.data.image_path
                      ? formatFileUrl(product.data.image_path)
                      : ""
                  }
                  alt={product.data.name || "Product image"}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Product Info */}
            <div className="flex-1 p-6">
              <CardHeader className="p-0 gap-1">
                <div className="flex items-center justify-between gap-4">
                  <CardTitle className="text-2xl font-bold">
                    {product.data?.name ?? "Loading product..."}
                  </CardTitle>

                  {/* Availability Badge */}
                  <Badge
                    variant={
                      product.data?.isAvailable ? "default" : "destructive"
                    }
                  >
                    {product.data?.isAvailable ? "Available" : "Unavailable"}
                  </Badge>
                </div>

                <CardDescription className="text-sm text-muted-foreground mt-1">
                  {/* {product.data?.category ?? "Product Details"} */}
                </CardDescription>
              </CardHeader>

              <CardContent className="p-0 mt-4">
                <p className="text-sm text-card-foreground leading-relaxed">
                  {product.data?.description ??
                    "No description available for this product."}
                </p>
              </CardContent>
            </div>
          </div>
        </Card>
      )}
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
