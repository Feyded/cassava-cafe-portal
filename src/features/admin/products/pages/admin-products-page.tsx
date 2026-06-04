import { useState } from "react";
import useGetProductsQuery from "@/features/admin/products/queries/use-get-products-query";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "../components/columns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ProductModal from "../components/product-modal";

export default function AdminProductPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const productsQuery = useGetProductsQuery({
    search: search,
    page,
    limit: limit,
  });

  return (
    <div className="container mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">
            Review your menu catalog, current availability, and variant pricing.
          </p>
        </div>
        <Button onClick={() => setModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={productsQuery.data?.data ?? []}
        loading={productsQuery.isFetching}
        total={productsQuery.data?.total}
        page={page}
        limit={limit}
        onPageChange={setPage}
        onLimitChange={setLimit}
      />

      <ProductModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
