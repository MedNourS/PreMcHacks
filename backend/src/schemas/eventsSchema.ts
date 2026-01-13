import { z } from "zod";

export const eventSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    start: z.coerce.date(),
    end: z.coerce.date().nullable().optional(),
    allDay: z.boolean().optional(),
    url: z.string().optional()
});