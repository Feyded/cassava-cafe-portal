import { api } from "@/services/api/axios";
import { useQuery } from "@tanstack/react-query";
import type { InventoryCategory } from "../../types/Category";

type GetInventoryCategoriesParams = {
  search?: string;
  limit?: number;
  page?: number;
};

export type PaginatedInventoryCategoriesResponse = {
  data: InventoryCategory[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number | null;
  to: number | null;
};

export default function useGetInventoryCategoriesQuery(
  params: GetInventoryCategoriesParams,
) {
  return useQuery({
    queryKey: ["admin-inventory-categories", params],
    queryFn: async (): Promise<PaginatedInventoryCategoriesResponse> => {
      const { data } = await api.get("/inventory-categories", {
        params,
      });
      return data;
    },
  });
}
