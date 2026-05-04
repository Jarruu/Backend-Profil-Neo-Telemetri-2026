import { z } from "zod";

export const ProgrammingCategories = ["Web", "Mobile"] as const;
export const MultimediaCategories = ["ThreeD", "UI_UX", "VideoEditing"] as const;
export const SKJCategories = ["ProxmoxVE", "Docker", "Nextcloud"] as const;

export const ProjectSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  division: z.enum(["Programming", "Multimedia", "SKJ"]),
  category: z.enum([
    ...ProgrammingCategories,
    ...MultimediaCategories,
    ...SKJCategories
  ]),
  projectLink: z.string().url().optional().or(z.literal("")),
  creationDate: z.string().transform((str) => new Date(str)),
}).superRefine((data, ctx) => {
  if (data.division === "Programming" && !ProgrammingCategories.includes(data.category as any)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Category must be Web or Mobile for Programming division",
      path: ["category"]
    });
  } else if (data.division === "Multimedia" && !MultimediaCategories.includes(data.category as any)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Category must be ThreeD, UI_UX, or VideoEditing for Multimedia division",
      path: ["category"]
    });
  } else if (data.division === "SKJ" && !SKJCategories.includes(data.category as any)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Category must be ProxmoxVE, Docker, or Nextcloud for SKJ division",
      path: ["category"]
    });
  }
});

export type ProjectInput = z.infer<typeof ProjectSchema>;
