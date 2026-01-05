import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import askRouter from './routers/askRouter';
import authRouter from './routers/authRouter';
import calendarRouter from './routers/calendarRouter';
import tasksRouter from './routers/tasksRouter';
import userRouter from './routers/userRouter';
import { authMiddleware } from './middleware';

const app = express();

app.use(cors());
app.use(cookieParser(`${process.env.SIGNING_SECRET}`));
app.use(express.json());
app.use(morgan('dev'));

/* Routes */
app.use('/ask', authMiddleware, askRouter);
app.use('/auth', authRouter);
app.use('/calendar', authMiddleware, calendarRouter);
app.use('/tasks', authMiddleware, tasksRouter);
app.use('/user', authMiddleware, userRouter);

export default app;