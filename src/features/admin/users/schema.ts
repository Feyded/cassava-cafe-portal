import z from "zod";

export const userSchema = z.object({
  first_name: z
    .string()
    .min(1, "First name is required")
    .max(60, "First name cannot exceed 60 characters"),
  middle_name: z.string().max(60, "Middle name cannot exceed 60 characters"),
  last_name: z
    .string()
    .min(1, "Last name is required")
    .max(60, "Last name cannot exceed 60 characters"),
  role: z
    .string()
    .min(1, "Role is required")
    .max(60, "Role cannot exceed 60 characters"),
  email: z.email().max(100, "Email cannot exceed 100 characters"),
  is_active: z.boolean(),
  password: z.string().optional(),
});

export type UserFormValues = z.infer<typeof userSchema>;
