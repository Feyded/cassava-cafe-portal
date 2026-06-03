import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { VariantCategories } from "../data/variants";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";

type ProductModalProps = {
  open: boolean;
  onClose: () => void;
};

const schema = z.object({
  name: z.string().min(1, "Name is required").max(60),
  description: z.string().min(1, "Description is required").max(255),
  category_id: z.coerce.number().refine((value) => value !== 0, {
    message: "Category is required",
  }),
});

export default function ProductModal({ open, onClose }: ProductModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      category_id: 0,
      //   variants: [{ name: "", price: 0 }],
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Product Modal</DialogTitle>
          <DialogDescription>
            Fill out the form below to add a new product.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register("name")} />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" {...register("description")} />
              {errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <NativeSelect className="w-full" {...register("category_id")}>
                {Object.values(VariantCategories).map((category) => (
                  <NativeSelectOption key={category.id} value={category.id}>
                    {category.label}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
              {errors.category_id && (
                <p className="text-sm text-red-500">
                  {errors.category_id.message}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
