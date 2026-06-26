import { useCallback, useMemo, useRef, useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { getColumns } from "../component/columns";
import { Input } from "@/components/ui/input";
import DiscountFormDialog from "../component/discount-form-dialog";
import useGetDiscountsQuery from "../hooks/use-get-discounts-query";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import type { Discount } from "@/entities/discount";

export default function DiscountsPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState<Discount | null>(null);

  const discountsQuery = useGetDiscountsQuery({
    page,
    limit,
    search,
  });

  const handleUpdateDiscount = useCallback((discount: Discount) => {
    setSelectedDiscount(discount);
    setDialogOpen(true);
  }, []);

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

  const handleCloseDialog = () => {
    setSelectedDiscount(null);
    setDialogOpen(false);
  };

  const columns = useMemo(
    () => getColumns({ onUpdateDiscount: handleUpdateDiscount }),
    [handleUpdateDiscount],
  );

  return (
    <div className=" mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Discounts</h1>
          <p className="text-muted-foreground">
            Review your discounts, current status, and details.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search discount by name..."
            onChange={handleSearchChange}
            className="pl-9 h-10 w-full bg-background"
          />
        </div>

        <Button
          className="w-full sm:w-auto h-10 gap-2 font-medium shadow-sm px-4"
          onClick={() => setDialogOpen(true)}
        >
          <Plus className="h-4 w-4" /> Add Discount
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={discountsQuery.data?.data ?? []}
        loading={discountsQuery.isFetching}
        total={discountsQuery.data?.total ?? 0}
        page={page}
        limit={limit}
        onPageChange={setPage}
        onLimitChange={setLimit}
      />

      <DiscountFormDialog
        isOpen={dialogOpen}
        onClose={handleCloseDialog}
        discount={selectedDiscount}
      />
    </div>
  );
}
