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
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { VariantCategories } from "../data/variants";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import useCreateProductMutation from "../queries/use-create-product-mutation";
import { toast } from "sonner";
import { useEffect } from "react";
import useUpdateProductMutation from "../queries/use-update-product-mutation";
import { Switch } from "@/components/ui/switch";

type ProductModalProps = {
  open: boolean;
  onClose: () => void;
  editingProduct: any | null;
};

const schema = z.object({
  name: z.string().min(1, "Name is required").max(60),
  description: z.string().min(1, "Description is required").max(255),
  categoryId: z.coerce.number().refine((value) => value !== 0, {
    message: "Category is required",
  }),
  isAvailable: z.coerce.boolean(),
  image: z
    .instanceof(File, { message: "Image is required" })
    .optional()
    .refine((file) => !file || file.type.startsWith("image/"), {
      message: "Only image files are allowed",
    })
    .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
      message: "Image must be less than 5MB",
    }),
});

export default function ProductModal({
  open,
  onClose,
  editingProduct,
}: ProductModalProps) {
  const createProductMutation = useCreateProductMutation();
  const updateProductMutation = useUpdateProductMutation();
  const isEdit = Boolean(editingProduct);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: editingProduct?.name ?? "",
      description: editingProduct?.description ?? "",
      categoryId: editingProduct?.category_id ?? 0,
      isAvailable: editingProduct?.is_available ?? true,
      image: undefined,
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    if (isEdit) {
      updateProductMutation.mutate(
        { id: editingProduct.id, payload: data },
        {
          onSuccess: () => {
            toast.success("Product updated successfully");
            handleClose();
          },
          onError: (error: any) => {
            const message =
              error.response?.data?.message || "Failed to update product";
            toast.error(message);
          },
        },
      );
    } else {
      createProductMutation.mutate(data, {
        onSuccess: () => {
          toast.success("Product created successfully");
          handleClose();
        },
        onError: (error: any) => {
          const message =
            error.response?.data?.message || "Failed to create product";
          toast.error(message);
        },
      });
    }
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  useEffect(() => {
    if (editingProduct) {
      reset({
        name: editingProduct.name,
        description: editingProduct.description,
        categoryId: editingProduct.category_id,
        isAvailable: editingProduct.is_available,
        image: undefined,
      });
    } else {
      reset({
        name: "",
        description: "",
        categoryId: 0,
        isAvailable: true,
        image: undefined,
      });
    }
  }, [editingProduct, reset]);

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
              <NativeSelect className="w-full" {...register("categoryId")}>
                {Object.values(VariantCategories).map((category) => (
                  <NativeSelectOption key={category.id} value={category.id}>
                    {category.label}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
              {errors.categoryId && (
                <p className="text-sm text-red-500">
                  {errors.categoryId.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="is-available">Availability</Label>
              <Controller
                name="isAvailable"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center gap-2">
                    <Switch
                      id="is-available"
                      checked={field.value as boolean}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                )}
              />
              {errors.isAvailable && (
                <p className="text-sm text-red-500">
                  {errors.isAvailable.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];

                  if (!file) return;
                  setValue("image", undefined as any);
                  setValue("image", file, {
                    shouldValidate: true,
                  });
                }}
              />
              {errors.image && (
                <p className="text-sm text-red-500">{errors.image.message}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              loading={
                createProductMutation.isPending ||
                updateProductMutation.isPending
              }
            >
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
