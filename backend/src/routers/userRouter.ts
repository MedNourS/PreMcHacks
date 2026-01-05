import { Router } from 'express';

const userRouter = Router();

userRouter.get('/profile', (req, res) => {

    res.json({ message: 'User profile endpoint' });
});

export default userRouter;
