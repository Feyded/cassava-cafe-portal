import { api } from "@/services/api/axios";
import { useQuery } from "@tanstack/react-query";

export default function useMeQuery() {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const { data } = await api.get("/me");
      return data;
    },

    retry: false,
  });
}
