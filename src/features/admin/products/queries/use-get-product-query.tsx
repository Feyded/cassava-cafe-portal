import { api } from "@/services/api/axios";
import { useQuery } from "@tanstack/react-query";

export default function useGetProductQuery(id: number) {
  return useQuery({
    queryKey: ["admin-products", id],
    queryFn: async () => {
      const { data } = await api.get(`/admin/products/${id}`);
      return data;
    },
  });
}
