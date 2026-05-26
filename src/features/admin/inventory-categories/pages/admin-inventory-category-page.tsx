import { useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { Plus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import useGetInventoryCategoriesQuery from "../queries/use-get-inventory-categories-query";
import InventoryCategoryModal from "@/features/admin/inventory-categories/components/inventory-category-modal";
import type { InventoryCategory } from "../../types/Category";
import { formatDate } from "@/utils/format-date";

export default function InventoryCategoriesPage() {
  const [page] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] =
    useState<InventoryCategory | null>(null);

  const { data, isLoading } = useGetInventoryCategoriesQuery({
    page,
    limit: 10,
  });

  const columns: ColumnDef<InventoryCategory>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }) => formatDate(row.original.created_at),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const category = row.original;
        return (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setCategoryToEdit(category);
              setModalOpen(true);
            }}
          >
            <Pencil className="w-4 h-4 mr-2" />
            Edit
          </Button>
        );
      },
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Inventory Categories</h1>
        <Button
          onClick={() => {
            setCategoryToEdit(null);
            setModalOpen(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={data?.data || []}
        loading={isLoading}
      />

      <InventoryCategoryModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        category={categoryToEdit}
      />
    </div>
  );
}
