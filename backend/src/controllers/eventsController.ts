import type { Request, Response } from 'express';
import { createEvent, getAllEvents } from '../db/eventsRepo';
import type { eventData } from '../types/eventsTypes';

export function getEventsControl(res: Response, userData: { id: number } | undefined) {
    const events = getAllEvents(userData!.id);

    if (!events) {
        return res.status(404).json({ success: false, error: "No events found" });
    }

    res.json({
        success: true,
        events: events
    });
}

export function createEventControl(res: Response, userData: { id: number } | undefined, eventData: eventData) {
    const { title, start, end, allDay, url } = eventData;

    if (!title || !start) {
        return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    createEvent(userData!.id, title, start, eventData.end);

    res.status(201).json({
        success: true,
        message: "Event created successfully",
        // event: newEvent
    });
}