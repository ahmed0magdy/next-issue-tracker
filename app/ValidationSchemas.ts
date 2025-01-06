import { string, z } from "zod";

export const IssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required").max(65535),
});

export const EditIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255).optional(),
  description: z
    .string()
    .min(1, "Description is required")
    .max(65535)
    .optional(),
  userId: z.string().min(1, "User is required").max(255).optional().nullable(), //null used for unassignable
  // userId: z.string().min(1, "User is required").regex(/^\d+$/).max(10).optional().nullable(),
});
