import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";
import askRouter from './routers/askRouter';
import authRouter from './routers/authRouter';
import calendarRouter from './routers/calendarRouter';
import eventsRouter from './routers/eventsRouter';
import userRouter from './routers/userRouter';
import { authMiddleware, testMiddleware } from './middleware';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(cookieParser(`${process.env.SIGNING_SECRET}`));
app.use(express.json());
app.use(morgan('dev'));

/* Routes */
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/ask', authMiddleware, askRouter);
app.use('/auth', authRouter);
app.use('/calendar', authMiddleware, calendarRouter);
app.use('/events', testMiddleware, eventsRouter);
app.use('/user', authMiddleware, userRouter);

export default app;