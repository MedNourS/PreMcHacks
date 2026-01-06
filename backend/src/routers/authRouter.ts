import { Router } from 'express';
import { z } from 'zod';
import { loginSchema, signUpSchema } from '../schemas/authSchema';
import { loginControl, logoutControl, signUpControl } from '../controllers/authController';

const authRouter = Router();

authRouter.post('/signup', (req, res) => {
    const result = signUpSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            errors: result.error.issues,
        })
    } else {
        signUpControl(res, result.data);
    }
})

authRouter.post('/login', (req, res) => {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json(
            z.treeifyError(result.error),
        )
    } else {
        loginControl(res, result.data);
    }
});

authRouter.post('/logout', (req, res) => {
    logoutControl(res);
});

export default authRouter;