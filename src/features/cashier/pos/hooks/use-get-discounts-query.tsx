import { api } from "@/shared/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function useGetDiscountsQuery() {
  return useQuery({
    queryKey: ["pos-discounts"],
    queryFn: async () => {
      const { data } = await api.get("/pos/discounts");
      return data;
    },
  });
}
