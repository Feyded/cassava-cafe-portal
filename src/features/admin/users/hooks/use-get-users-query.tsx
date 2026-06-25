import { api } from "@/shared/lib/api";
import { useQuery } from "@tanstack/react-query";

type GetUsersParams = {
  page: number;
  limit: number;
  search?: string;
};

export default function useGetUsersQuery(params: GetUsersParams) {
  return useQuery({
    queryKey: ["admin-users", params],
    queryFn: async () => {
      const { data } = await api.get("/admin/users", {
        params,
      });
      return data;
    },
  });
}