import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(60, "Name must be less than 60 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(255, "Description must be less than 255 characters"),
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

export type ProductFormValues = z.infer<typeof productSchema>;
export type ProductFormInput = z.input<typeof productSchema>;

export const productVariantSchema = z.object({
  name: z.string().min(1, "Name is required").max(60),
  price: z.string().min(1, "Price is required").max(99999),
  isActive: z.coerce.boolean(),
});

export type ProductVariantFormValues = z.infer<typeof productVariantSchema>;