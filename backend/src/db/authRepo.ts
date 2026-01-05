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
