import { Router } from 'express';
import { emailControl, profileControl, usernameControl } from '../controllers/userController';
import { changeUsername } from '../db/userRepo';
import { emailSchema, usernameSchema } from '../schemas/userSchema';

const userRouter = Router();

/**
 * @openapi
 * /user/profile:
 *   get:
 *     summary: Get user profile
 *     description: Retrieves the profile information of the authenticated user.
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: Successful retrieval of user profile
 *       401:
 *         description: Unauthorized
 */
userRouter.get('/profile', (req, res) => {
    profileControl(res, req.user);
});

/**
 * @openapi
 * /user/username:
 *   patch:
 *     summary: Change username
 *     description: Updates the username of the authenticated user.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *             properties:
 *               username:
 *                 type: string
 *     responses:
 *       200:
 *         description: Username successfully updated
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized
 */
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

userRouter.patch('/email', (req, res) => {
    const result = emailSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            errors: result.error.issues,
        });
    } else {
        emailControl(res, req.user, result.data);
    }
});

export default userRouter;
