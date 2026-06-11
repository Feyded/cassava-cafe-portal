import { Button } from "@/components/ui/button";
import useGetProductsQuery from "@/features/menu/queries/use-get-products-query";
import { useState } from "react";

export const CATEGORIES = [
  { id: 1, name: "Snacks" },
  { id: 2, name: "Refreshers" },
  { id: 3, name: "Fruit Tea" },
  { id: 4, name: "Hot Coffee" },
  { id: 5, name: "Iced Coffee" },
  { id: 6, name: "Smoothies" },
  { id: 7, name: "Yogurt Series" },
  { id: 8, name: "Frappe" },
] as const;

export default function PosPage() {
  const [selectedCategory, setSelectedCategory] = useState(1);

  const productsQuery = useGetProductsQuery({ page: 1, limit: 100, category_id: selectedCategory });
  
  return (
    <div>
      {CATEGORIES.map((category) => (
        <Button
          className="cursor-pointer"
          onClick={() => setSelectedCategory(category.id)}
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "secondary"}
          color="primary"
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
}
