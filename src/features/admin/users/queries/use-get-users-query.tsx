import { api } from "@/services/api/axios";
import { useQuery } from "@tanstack/react-query";

type GetUsersParams = {
  limit?: number;
  page?: number;
  status?: string;
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
