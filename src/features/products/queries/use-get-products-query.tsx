import { useQuery } from "@tanstack/react-query";

export default function useGetProductsQuery() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      // Replace with your API call
      const response = await fetch("/api/products");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
}
