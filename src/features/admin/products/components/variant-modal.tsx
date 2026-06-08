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
import { toast } from "sonner";
import { useEffect } from "react";
import useUpdateProductMutation from "../queries/use-update-product-mutation";
import { Switch } from "@/components/ui/switch";
import type { Variant } from "@/features/menu/types/product";
import useCreateVariantMutation from "../queries/use-create-variant-mutation";

type ProductModalProps = {
  open: boolean;
  onClose: () => void;
  editingVariant: Variant | null;
  productId: string;
};

const schema = z.object({
  name: z.string().min(1, "Name is required").max(60),
  price: z.string().min(1, "Price is required").max(99999),
  isActive: z.coerce.boolean(),
});

export default function VariantModal({
  open,
  onClose,
  editingVariant,
  productId,
}: ProductModalProps) {
  const createVariantMutation = useCreateVariantMutation(productId);
  const updateProductMutation = useUpdateProductMutation();
  const isEdit = Boolean(editingVariant);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: editingVariant?.name ?? "",
      price: editingVariant?.price ?? "",
      isActive: editingVariant?.is_active ?? false,
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    if (isEdit) {
      updateProductMutation.mutate(
        { id: editingVariant?.id!, payload: data },
        {
          onSuccess: () => {
            toast.success("Variant updated successfully");
            handleClose();
          },
          onError: (error: any) => {
            const message =
              error.response?.data?.message || "Failed to update variant";
            toast.error(message);
          },
        },
      );
    } else {
      createVariantMutation.mutate(data, {
        onSuccess: () => {
          toast.success("Variant created successfully");
          handleClose();
        },
        onError: (error: any) => {
          const message =
            error.response?.data?.message || "Failed to create variant";
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
    if (editingVariant) {
      reset({
        name: editingVariant.name,
        price: editingVariant.price,
        isActive: editingVariant.is_active,
      });
    } else {
      reset({
        name: "",
        price: "",
        isActive: false,
      });
    }
  }, [editingVariant, reset]);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Variant Modal</DialogTitle>
          <DialogDescription>
            Fill out the form below to add a new variant.
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
              <Label htmlFor="price">Price</Label>
              <Input id="price" {...register("price")} />
              {errors.price && (
                <p className="text-sm text-red-500">{errors.price.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="is-active">Availability</Label>
              <Controller
                name="isActive"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center gap-2">
                    <Switch
                      id="is-active"
                      checked={field.value as boolean}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                )}
              />
              {errors.isActive && (
                <p className="text-sm text-red-500">
                  {errors.isActive.message}
                </p>
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
                createVariantMutation.isPending ||
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
