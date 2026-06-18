import { useMemo, useRef, useState } from "react";
import useGetProductsQuery from "@/features/admin/products/queries/use-get-products-query";
import { DataTable } from "@/components/ui/data-table";
import { createColumns } from "../components/columns";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import ProductModal from "../components/product-modal";
import type { Product } from "@/types/models/product";
import { Input } from "@/components/ui/input";
import useGetModifierGroupsQuery from "../queries/use-get-modifier-groups-query";

export default function ProductsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const productsQuery = useGetProductsQuery({
    search: search,
    page,
    limit: limit,
  });

  const modifierGroupsQuery = useGetModifierGroupsQuery({
    page: 1,
    limit: 100,
  });

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleOpen = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    searchTimeout.current = setTimeout(() => {
      setSearch(value);
      setPage(1);
    }, 400);
  };

  const columns = useMemo(
    () => createColumns({ onEdit: handleEdit }),
    [handleEdit],
  );

  return (
    <div className=" mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        <p className="text-muted-foreground">
          Review your menu catalog, current availability, and variant pricing.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search product by name..."
            className="pl-9 h-10 w-full bg-background"
            onChange={handleSearchChange}
          />
        </div>

        <Button
          className="w-full sm:w-auto h-10 gap-2 font-medium shadow-sm px-4"
          onClick={handleOpen}
        >
          <Plus className="h-4 w-4" /> Add Product
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={productsQuery.data?.data ?? []}
        loading={productsQuery.isFetching}
        total={productsQuery.data?.total ?? 0}
        page={page}
        limit={limit}
        onPageChange={setPage}
        onLimitChange={setLimit}
      />

      <ProductModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        editingProduct={editingProduct}
      />
    </div>
  );
}
