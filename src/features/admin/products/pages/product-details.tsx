import { DataTable } from "@/components/ui/data-table";
import useGetProductQuery from "../hooks/use-get-product-query";
import useGetProductVariantsQuery from "../hooks/use-get-product-variants-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import type { ColumnDef } from "@tanstack/react-table";
import { formatPrice } from "@/shared/utils/format-price";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, Plus } from "lucide-react";
import VariantModal from "../components/variant-modal";
import type { ProductVariant } from "@/entities/product";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailsPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [editingVariant, setEditingVariant] = useState<ProductVariant | null>(
    null,
  );
  const [openModal, setOpenModal] = useState(false);

  const { id } = useParams();

  const productQuery = useGetProductQuery(Number(id));

  const productVariants = useGetProductVariantsQuery({
    limit,
    page,
    productId: Number(id),
  });

  const columns: ColumnDef<ProductVariant>[] = [
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
      accessorKey: "is_active",
      header: "Availability",
      cell: ({ row }) => (
        <Badge variant={row.original.is_active ? "success" : "destructive"}>
          {row.original.is_active ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      id: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleEditVariant(row.original)}
          >
            Edit
          </Button>
        </div>
      ),
    },
  ];

  const handleAddVariant = () => {
    setEditingVariant(null);
    setOpenModal(true);
  };

  const handleEditVariant = (variant: ProductVariant) => {
    setEditingVariant(variant);
    setOpenModal(true);
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-5">
        {productQuery.isFetching ? (
          <>
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </>
        ) : productQuery.data ? (
          <>
            {/* Product Image */}
            {productQuery.data.image_path ? (
              <img
                src={`/${productQuery.data.image_path}`}
                alt={productQuery.data.name}
                className="h-12 w-12 rounded-full object-cover border border-border"
              />
            ) : (
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border bg-muted">
                {/* Box/Package icon outline representing a product silhouette */}
                <svg
                  className="h-5 w-5 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
            )}

            {/* Product Details */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold leading-none tracking-tight text-foreground">
                  {productQuery.data.name}
                </h3>
                {/* Optional shadcn Badge for Category */}
                <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-secondary text-secondary-foreground">
                  {productQuery.data.category?.name}
                </span>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-1">
                {productQuery.data.description}
              </p>
            </div>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">No product found.</p>
        )}
      </div>

      <Button className="mb-4" onClick={handleAddVariant}>
        <Plus className="w-4 h-4 mr-2" />
        Add Variant
      </Button>
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

      <VariantModal
        productId={Number(id)}
        editingVariant={editingVariant}
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
}
