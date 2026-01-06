import type { Response } from 'express';
import jwt from 'jsonwebtoken';
import type { signUpCredentials, loginCredentials } from '../types/authTypes';
import { createUser, loginUser } from '../db/userRepo';

export async function signUpControl(res: Response, credentials: signUpCredentials) {
    const { username, email, password } = credentials;

    const userCreation = await createUser(username, email, password);

    if (!userCreation.success) {
        return res.status(400).json({ success: false, error: userCreation.error });
    }

    return res.status(201).json({
        success: true,
        message: 'User successfully created'
    });
}

export async function loginControl(res: Response, credentials: loginCredentials) {
    const { identifier, password } = credentials;

    const userId = await loginUser(identifier, password);

    if (!userId) {
        return res.status(401).json({ success: false, error: "Invalid credentials" });
    }

    const token = jwt.sign(
        { sub: userId },
        process.env.JWT_ACCESS_TOKEN_SECRET!,
        { expiresIn: "7d" }
    );

    res.cookie("auth", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        path: "/",
    }).status(200).json({ success: true, message: "Login successful" });
}

export function logoutControl(res: Response) {
    res.clearCookie("auth", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
    }).status(200).json({ success: true });
}