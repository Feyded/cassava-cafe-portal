import { api } from "@/shared/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function useGetOrdersQuery() {
  return useQuery({
    queryKey: ["pos-orders"],
    queryFn: async () => {
      const { data } = await api.get("/pos/orders");
      return data;
    },
  });
}
