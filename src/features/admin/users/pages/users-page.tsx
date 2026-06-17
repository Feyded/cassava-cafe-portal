import { useCallback, useMemo, useRef, useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { getColumns } from "../component/columns";
import ReceiptDialog from "../component/receipt-modal";
import type { User } from "../types/user";
import { Input } from "@/components/ui/input";
import useGetUsersQuery from "../queries/use-get-users-query";

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const usersQuery = useGetUsersQuery({
    page,
    limit,
    search,
  });

  const handleViewReceipt = useCallback((user: User) => {
    setSelectedUser(user);
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

  const columns = useMemo(
    () => getColumns({ onViewReceipt: handleViewReceipt }),
    [handleViewReceipt],
  );

  return (
    <div className=" mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">
            Review your users, current status, and details.
          </p>
        </div>
      </div>

      <Input placeholder="Search user..." onChange={handleSearchChange} />

      <DataTable
        columns={columns}
        data={usersQuery.data?.data ?? []}
        loading={usersQuery.isFetching}
        total={usersQuery.data?.total ?? 0}
        page={page}
        limit={limit}
        onPageChange={setPage}
        onLimitChange={setLimit}
      />

      <ReceiptDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        order={selectedUser}
      />
    </div>
  );
}
