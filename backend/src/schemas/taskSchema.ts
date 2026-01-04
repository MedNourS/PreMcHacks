import { z } from "zod";

export const taskSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    due_date: z.iso.datetime().optional(),
    completed: z.boolean().default(false)
});