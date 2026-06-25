import { useCallback, useMemo, useRef, useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { getColumns } from "../component/columns";
import { Input } from "@/components/ui/input";
import UserFormDialog from "../component/user-form-dialog";
import useGetUsersQuery from "../hooks/use-get-users-query";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import type { User } from "@/entities/user";

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

  const handleUpdateUser = useCallback((user: User) => {
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

  const handleCloseDialog = () => {
    setSelectedUser(null);
    setDialogOpen(false);
  };

  const columns = useMemo(
    () => getColumns({ onUpdateUser: handleUpdateUser }),
    [handleUpdateUser],
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

      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search user by name..."
            onChange={handleSearchChange}
            className="pl-9 h-10 w-full bg-background"
          />
        </div>

        <Button
          className="w-full sm:w-auto h-10 gap-2 font-medium shadow-sm px-4"
          onClick={() => setDialogOpen(true)}
        >
          <Plus className="h-4 w-4" /> Add User
        </Button>
      </div>

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

      <UserFormDialog
        isOpen={dialogOpen}
        onClose={handleCloseDialog}
        user={selectedUser}
      />
    </div>
  );
}
