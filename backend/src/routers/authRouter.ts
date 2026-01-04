import { Router } from 'express';
import { z } from 'zod';
import { loginSchema } from '../schemas/authSchema';
import { loginControl } from '../controllers/authController';

const authRouter = Router();

authRouter.post('/signup', (req, res) => {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            errors: result.error.issues,
        })
    }
})

authRouter.post('/login', (req, res) => {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json(
            z.treeifyError(result.error),
        )
    }

    loginControl(res, result.data);
});

export default authRouter;