import type { Request, Response } from 'express';
import { changeUsername, getUserById } from '../db/userRepo';

export function profileControl(res: Response, userData: { id: number } | undefined) {
    const user = getUserById(userData!.id);

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at
    });
}

export function usernameControl(res: Response, user: { id: number } | undefined, data: { username: string }) {
    const result = changeUsername(user!.id, data.username);
    if (!result.success) {
        return res.status(400).json({ success: false, error: result.error });
    } else {
        return res.status(200).json({ success: true });
    }
}