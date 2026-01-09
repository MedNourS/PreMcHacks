import { z } from "zod";

export const taskSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    start_time: z.iso.datetime(),
    end_time: z.iso.datetime(),
    completed: z.boolean().default(false)
});