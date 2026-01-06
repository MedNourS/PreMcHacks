import type { NextFunction, Request, Response } from 'express';
import jwt from "jsonwebtoken";
import type { AuthPayload } from './types/authTypes';

const JWT_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET!;

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies?.auth;

    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET) as AuthPayload;
        req.user = { id: payload.sub };
        next();
    } catch {
        return res.status(401).json({ error: "Unauthorized" });
    }
}

export function testMiddleware(req: Request, res: Response, next: NextFunction) {
    req.user = { id: 1 };
    next();
}
