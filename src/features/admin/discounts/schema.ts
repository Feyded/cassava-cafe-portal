import z from "zod";

export const discountSchema = z.object({
  name: z
    .string()
    .min(1, "name is required")
    .max(60, "name cannot exceed 60 characters"),
  percentage: z.coerce.number().max(100),
  is_active: z.boolean(),
});

export type DiscountFormValues = z.infer<typeof discountSchema>;
