import { api } from "@/services/api/axios";
import { useQuery } from "@tanstack/react-query";

type GetModifierGroupsParams = {
  limit: number;
  page: number;
};

export default function useGetModifierGroupsQuery(
  params: GetModifierGroupsParams,
) {
  return useQuery({
    queryKey: ["admin-modifier-groups", params],
    queryFn: async () => {
      const { data } = await api.get("/admin/modifier-groups", {
        params,
      });
      return data;
    },
  });
}
