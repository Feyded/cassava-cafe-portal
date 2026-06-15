import { CATEGORIES } from "../data/categories";
import { ShoppingCart } from "lucide-react";

type CategoryListProps = {
  selectedCategory: number;
  onSelect: (categoryId: number) => void;
};

export default function CategoryList({
  selectedCategory,
  onSelect,
}: CategoryListProps) {
  return (
    <div className="w-40 bg-white border-r border-slate-200 flex flex-col justify-between p-4 gap-4">
      <div>
        <div className="flex items-center gap-2 px-2 py-3 mb-4 border-b border-slate-100">
          <ShoppingCart className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg tracking-tight">Categories</span>
        </div>
        <div className="space-y-1">
          {CATEGORIES.map((cat) => {
            // const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelect(cat.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-white shadow-md shadow-indigo-100"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-slate-100 p-3 rounded-xl text-xs text-slate-500 text-center">
        Cashier: James
      </div>
    </div>
  );
}
