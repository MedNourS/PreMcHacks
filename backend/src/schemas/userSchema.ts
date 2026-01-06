import { z } from 'zod';

export const usernameSchema = z.object({
    username: z.string().trim().min(1, "Username cannot be empty")
});