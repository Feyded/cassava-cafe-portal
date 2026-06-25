import z from "zod";

export const createUserSchema = z.object({
  first_name: z.string().min(1).max(60),
  middle_name: z.string().max(60),
  last_name: z.string().min(1).max(60),
  role: z.string().min(1).max(60),
  email: z.email().max(100),
  is_active: z.boolean(),
  password: z.string().optional(),
});

export type CreateUserFormValues = z.infer<typeof createUserSchema>;
