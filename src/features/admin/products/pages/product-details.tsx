import { DataTable } from "@/components/ui/data-table";
import useGetProductQuery from "../hooks/use-get-product-query";
import useGetProductVariantsQuery from "../hooks/use-get-product-variants-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import type { ColumnDef } from "@tanstack/react-table";
import { formatPrice } from "@/shared/utils/format-price";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import VariantModal from "../components/variant-modal";
import type { ProductVariant } from "@/entities/product";

export default function ProductDetailsPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [editingVariant, setEditingVariant] = useState<ProductVariant | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const { id } = useParams();

  const product = useGetProductQuery(Number(id));

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
        productId={id!}
        editingVariant={editingVariant}
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
}
