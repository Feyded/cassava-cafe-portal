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
import { getErrorMessage } from "@/shared/utils/get-error-message";
import useCreateProductMutation from "../hooks/use-create-product-mutation";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import useUpdateProductMutation from "../hooks/use-update-product-mutation";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  productSchema,
  type ProductFormInput,
  type ProductFormValues,
} from "../schema";
import type { Product } from "@/entities/product";

type ProductModalProps = {
  open: boolean;
  onClose: () => void;
  editingProduct: Product | null;
};

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
  } = useForm<ProductFormInput, unknown, ProductFormValues>({
    defaultValues: {
      name: editingProduct?.name ?? "",
      description: editingProduct?.description ?? "",
      categoryId: editingProduct?.category_id ?? 0,
      isAvailable: editingProduct?.is_available ?? true,
      image: undefined,
    },
    resolver: zodResolver(productSchema),
  });

  const onSubmit = (data: ProductFormValues) => {
    if (isEdit && editingProduct) {
      updateProductMutation.mutate(
        { id: editingProduct.id, payload: data },
        {
          onSuccess: () => {
            toast.success("Product updated successfully");
            handleClose();
          },
          onError: (error) => {
            toast.error(getErrorMessage(error));
          },
        },
      );
    } else {
      createProductMutation.mutate(data, {
        onSuccess: () => {
          toast.success("Product created successfully");
          handleClose();
        },
        onError: (error) => {
          toast.error(getErrorMessage(error));
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
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value ? String(field.value) : ""}
                    onValueChange={(value) => field.onChange(Number(value))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>

                    <SelectContent>
                      {Object.values(VariantCategories).map((category) => (
                        <SelectItem
                          key={category.id}
                          value={String(category.id)}
                        >
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
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
