import { Router } from 'express';
import { taskSchema } from '../schemas/taskSchema';

const tasksRouter = Router();

tasksRouter.post('/add', (req, res) => {
    const result = taskSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            errors: result.error.issues,
        })
    } else {
        // TODO
    }
});

export default tasksRouter;
