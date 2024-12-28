import { string, z } from "zod";

export const IssueSchema = z.object({
  title: string().min(1, "Title is required").max(255),
  description: string().min(1, "Description is required"),
});
