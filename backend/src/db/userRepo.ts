import type { User } from '../types/userTypes';
import { db } from './database';
import bcrypt from 'bcrypt'

export async function createUser(username: string, email: string, password: string) {
    const stmt = db.prepare(`
        INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)
    `);

    const hashedPassword = await bcrypt.hash(password, 12);

    try {
        stmt.run(username, email, hashedPassword);
    } catch (e) {
        return {
            success: false,
            error: 'Username or email already exists'
        };
    }

    return {
        success: true
    }
}

export async function loginUser(identifier: string, password: string) {
    const stmt = db.prepare(`
        SELECT id, username, email, password_hash
        FROM users
        WHERE email = ? OR username = ?
    `);

    const user = stmt.get(identifier, identifier) as User | undefined;

    if (!user) {
        return null;
    }

    const valid = await bcrypt.compare(password, user.password_hash);

    if (!valid) {
        return null;
    }

    return user.id;
}

export function getUserById(userId: number): User | null {
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    const row = stmt.get(userId);

    if (!row) return null;

    return row as User;
}

export function changeUsername(userId: number, newUsername: string): { success: boolean; message?: string; error?: string } {
    const stmt = db.prepare(`
        UPDATE users
        SET username = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    `);

    try {
        stmt.run(newUsername, userId);
        return { success: true, message: "Username updated successfully" };
    } catch (e) {
        return { success: false, error: "Failed to update username: another user already exists with that username" };
    }
}

export function changeEmail(userId: number, newEmail: string): { success: boolean; message?: string; error?: string } {
    const stmt = db.prepare(`
        UPDATE users
        SET email = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    `);

    try {
        stmt.run(newEmail, userId);
        return { success: true, message: "Email updated successfully" };
    } catch (e) {
        return { success: false, error: "Failed to update email: another user already exists with that email" };
    }
}