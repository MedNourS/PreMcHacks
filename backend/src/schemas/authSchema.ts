import { z } from 'zod';

export const signUpSchema = z.object({
    username: z.string(),
    email: z.email(),
    password: z.string().min(8)
});

export const loginSchema = z.object({
    identifier: z.string(),
    password: z.string().min(8),
});