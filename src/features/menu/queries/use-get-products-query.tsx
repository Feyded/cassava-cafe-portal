import { api } from "@/services/api/axios";
import { useQuery } from "@tanstack/react-query";

export default function useGetProductsQuery() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await api.get("/products");
      return data;
    },
  });
}
