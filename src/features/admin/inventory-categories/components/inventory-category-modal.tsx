import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useCreateInventoryCategoryMutation from "../queries/use-create-inventory-category-mutation";
import useUpdateInventoryCategoryMutation from "../queries/use-update-inventory-category-mutation";
import { useQueryClient } from "@tanstack/react-query";
import type { CreateInventoryCategoryPayload, InventoryCategory } from "../../types/Category";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: InventoryCategory | null;
}

export default function InventoryCategoryModal({ open, onOpenChange, category }: Props) {
  const isEditing = !!category;
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm<CreateInventoryCategoryPayload>({
    defaultValues: { name: "" },
  });

  useEffect(() => {
    if (open) {
      if (category) {
        reset({ name: category.name });
      } else {
        reset({ name: "" });
      }
    }
  }, [open, category, reset]);

  const createMutation = useCreateInventoryCategoryMutation();
  const updateMutation = useUpdateInventoryCategoryMutation();

  const isPending = createMutation.isPending || updateMutation.isPending;

  const onSubmit = (data: CreateInventoryCategoryPayload) => {
    if (isEditing) {
      updateMutation.mutate(
        { id: category.id, payload: data },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-inventory-categories"] });
            onOpenChange(false);
          },
        }
      );
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["admin-inventory-categories"] });
          onOpenChange(false);
        },
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Category" : "Add Category"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name", { required: true })} />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} loading={isPending}>
              {isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}