import { Router } from 'express';
import { z } from 'zod';
import { loginSchema, signUpSchema } from '../schemas/authSchema';
import { loginControl, logoutControl, signUpControl } from '../controllers/authController';

const authRouter = Router();

/**
 * @openapi
 * /auth/signup:
 *   post:
 *     summary: Create a new user account
 *     description: Registers a new user using email/username and password.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 8
 *     responses:
 *       201:
 *         description: User successfully created
 *       400:
 *         description: Invalid request body
 */
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

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     description: Authenticates a user and sets an HTTP-only auth cookie.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - identifier
 *               - password
 *             properties:
 *               identifier:
 *                 type: string
 *                 description: Username or email
 *               password:
 *                 type: string
 *                 minLength: 8
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials or malformed request
 */
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

/**
 * @openapi
 * /auth/logout:
 *   post:
 *     summary: Log out the current user
 *     description: Clears the authentication cookie.
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Logout successful
 */
authRouter.post('/logout', (req, res) => {
    logoutControl(res);
});

export default authRouter;