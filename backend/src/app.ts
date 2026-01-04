import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import askRouter from './routers/askRouter';
import authRouter from './routers/authRouter';
import calendarRouter from './routers/calendarRouter';
import tasksRouter from './routers/tasksRouter';

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev'));

/* Routes */
app.use('/ask', askRouter);
app.use('/auth', authRouter);
app.use('/calendar', calendarRouter);
app.use('/tasks', tasksRouter);

export default app;