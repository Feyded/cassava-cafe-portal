import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { useCreateDiscountQuery } from "../hooks/use-create-discount-mutation";
import useUpdateDiscountsMutation from "../hooks/use-update-discount-mutation";
import { toast } from "sonner";
import { getErrorMessage } from "@/shared/utils/get-error-message";
import type { Discount } from "@/entities/discount";
import { discountSchema, type DiscountFormValues } from "../schema";

interface DiscountFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  discount: Discount | null;
}

export default function DiscountFormDialog({
  isOpen,
  onClose,
  discount,
}: DiscountFormDialogProps) {
  const [showPassword, setShowPassword] = useState(false);
  const createDiscountMutation = useCreateDiscountQuery();
  const updateDiscountMutation = useUpdateDiscountsMutation();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: discount?.name ?? "",
      percentage: discount?.percentage ?? "",
      is_active: discount?.is_active ?? true,
    },
    resolver: zodResolver(discountSchema),
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        name: discount?.name ?? "",
        percentage: discount?.percentage ?? "",
        is_active: discount?.is_active ?? true,
      });
    }
  }, [discount, isOpen, reset]);

  const onFormSubmit = async (data: DiscountFormValues) => {
    try {
      if (discount) {
        await updateDiscountMutation.mutateAsync({ id: discount.id, payload: data });
      } else {
       
        await createDiscountMutation.mutateAsync(data);
      }

      toast.success(
        discount ? "Discount updated successfully!" : "Discount created successfully!",
      );
      onClose();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{discount ? "Edit Discount" : "Create Discount"}</DialogTitle>
          <DialogDescription>
            {discount
              ? "Edit the details of the discount."
              : "Fill in the details to create a new discount."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">First Name</Label>
            <Input
              id="name"
              placeholder="John"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

      
          <div className="flex flex-col gap-2">
            <Label htmlFor="percentage">Middle Name (Optional)</Label>
            <Input
              id="percentage"
              placeholder="Doe"
              {...register("percentage")}
            />
            {errors.percentage && (
              <p className="text-sm text-red-500">
                {errors.percentage.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
              <Label htmlFor="is_active">Active Status</Label>
              <p className="text-xs text-muted-foreground">
                Control whether this discount can log into the platform.
              </p>
            </div>
            <Controller
              control={control}
              name="is_active"
              render={({ field }) => (
                <Switch
                  id="is_active"
                  checked={field.value as boolean}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              loading={
                createDiscountMutation.isPending || updateDiscountMutation.isPending
              }
            >
              {discount ? "Save Changes" : "Create Discount"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
