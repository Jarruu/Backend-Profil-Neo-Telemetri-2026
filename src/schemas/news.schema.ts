import { z } from "zod";

export const NewsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  shortDescription: z.string().min(1, "Short description is required"),
  content: z.string().min(1, "Content is required"),
});

export type NewsInput = z.infer<typeof NewsSchema>;
