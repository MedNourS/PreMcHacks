export type eventData = {
    title: string;
    description?: string;
    start: Date;
    end?: Date | null;
    allDay?: boolean;
    url?: string;
};