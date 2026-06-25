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
import z from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { useCreateUserQuery } from "../hooks/use-create-user-mutation";
import useUpdateUsersMutation from "../hooks/use-update-user-mutation";
import { toast } from "sonner";
import { getErrorMessage } from "@/shared/utils/get-error-message";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import type { User } from "@/entities/user";

interface UserFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

const schema = z.object({
  first_name: z.string().min(1).max(60),
  middle_name: z.string().max(60).optional(),
  last_name: z.string().min(1).max(60),
  role: z.string().min(1).max(60),
  email: z.string().email().min(6).max(100),
  is_active: z.boolean(),
  password: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function UserFormDialog({
  isOpen,
  onClose,
  user,
}: UserFormDialogProps) {
  const [showPassword, setShowPassword] = useState(false);
  const createUserMutation = useCreateUserQuery();
  const updateUserMutation = useUpdateUsersMutation();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: user?.first_name ?? "",
      middle_name: user?.middle_name ?? "",
      last_name: user?.last_name ?? "",
      email: user?.email ?? "",
      role: user?.role ?? "",
      is_active: user?.is_active ?? true,
    },
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        first_name: user?.first_name ?? "",
        middle_name: user?.middle_name ?? "",
        last_name: user?.last_name ?? "",
        email: user?.email ?? "",
        role: user?.role ?? "",
        is_active: user?.is_active ?? true,
      });
    }
  }, [user, isOpen, reset]);

  const onFormSubmit = async (data: FormValues) => {
    try {
      if (user) {
        await updateUserMutation.mutateAsync({ id: user.id, payload: data });
      } else {
        if (!data.password) {
          toast.error("Password is required when creating a new user.");
          return;
        }
        const payload = {
          ...data,
          password: data.password,
        };
        await createUserMutation.mutateAsync(payload);
      }

      toast.success(
        user ? "User updated successfully!" : "User created successfully!",
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
          <DialogTitle>{user ? "Edit User" : "Create User"}</DialogTitle>
          <DialogDescription>
            {user
              ? "Edit the details of the user."
              : "Fill in the details to create a new user."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          {/* First Name */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="first_name">First Name</Label>
            <Input
              id="first_name"
              placeholder="John"
              {...register("first_name")}
            />
            {errors.first_name && (
              <p className="text-sm text-red-500">
                {errors.first_name.message}
              </p>
            )}
          </div>

          {/* Middle Name */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="middle_name">Middle Name (Optional)</Label>
            <Input
              id="middle_name"
              placeholder="Doe"
              {...register("middle_name")}
            />
            {errors.middle_name && (
              <p className="text-sm text-red-500">
                {errors.middle_name.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="last_name">Last Name</Label>
            <Input
              id="last_name"
              placeholder="Smith"
              {...register("last_name")}
            />
            {errors.last_name && (
              <p className="text-sm text-red-500">{errors.last_name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="john.doe@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          {!user && (
            <>
              {/* Password */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    placeholder="********"
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                  <Button
                    onClick={() => setShowPassword((prev) => !prev)}
                    variant="ghost"
                    className="absolute inset-y-0 right-0 px-3"
                    type="button"
                  >
                    {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                  </Button>
                </div>
              </div>
            </>
          )}
          {/* Role (Using Controller for Custom Select wrapper) */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="role">Role</Label>
            <Controller
              control={control}
              name="role"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full" id="role">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="cashier">Cashier</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.role && (
              <p className="text-sm text-red-500">{errors.role.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
              <Label htmlFor="is_active">Active Status</Label>
              <p className="text-xs text-muted-foreground">
                Control whether this user can log into the platform.
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
                createUserMutation.isPending || updateUserMutation.isPending
              }
            >
              {user ? "Save Changes" : "Create User"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
