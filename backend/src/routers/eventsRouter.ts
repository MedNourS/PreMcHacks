import { Router } from 'express';
import { eventSchema } from '../schemas/eventsSchema';
import { createEventControl, getEventsControl } from '../controllers/eventsController';

const eventsRouter = Router();

eventsRouter.get('/', (req, res) => {
    getEventsControl(res, req.user);
});

eventsRouter.post('/add', (req, res) => {
    const result = eventSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            errors: result.error.issues,
        })
    } else {
        createEventControl(res, req.user, result.data);
    }
});

export default eventsRouter;
