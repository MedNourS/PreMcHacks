import { Router } from 'express';
import { profileControl, usernameControl } from '../controllers/userController';
import { changeUsername } from '../db/userRepo';
import { usernameSchema } from '../schemas/userSchema';

const userRouter = Router();

userRouter.get('/profile', (req, res) => {
    profileControl(res, req.user);
});

userRouter.patch('/username', (req, res) => {
    const result = usernameSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            errors: result.error.issues,
        });
    } else {
        usernameControl(res, req.user, result.data);
    }
});

export default userRouter;
