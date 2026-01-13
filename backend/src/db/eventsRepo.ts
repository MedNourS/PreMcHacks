import { db } from './database';

export function getAllEvents(userId: number) {
    const stmt = db.prepare('SELECT * FROM events WHERE user_id = ?');
    const events = stmt.all(userId);

    return events;
}

export function createEvent(userId: number, title: string, start: Date, end: Date | null | undefined) {
    const stmt = db.prepare('INSERT INTO events (user_id, title, start_time, end_time) VALUES (?, ?, ?, ?)');
    const info = stmt.run(userId, title, start.toISOString(), end ? end.toISOString() : null);

    return info;
}