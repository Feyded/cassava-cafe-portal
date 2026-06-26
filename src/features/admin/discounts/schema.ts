import z from "zod";

export const discountSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(60, "Must not exceed 60 characters"),

  percentage: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.coerce
      .number("Percentage is required")
      .min(0)
      .max(100, "Must not exceed 100"),
  ),

  is_active: z.coerce.boolean(),
});
export type DiscountFormValues = z.infer<typeof discountSchema>;
export type DiscountFormInput = z.input<typeof discountSchema>;
