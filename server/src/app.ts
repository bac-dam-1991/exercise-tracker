import express from 'express';
import exerciseController from './components/exercises/exerciseController';
import routineController from './components/routines/routineController';
import calendarController from './components/calendar/calendarController';
import cors from 'cors';
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/v1/exercises', exerciseController);
app.use('/api/v1/routines', routineController);
app.use('/api/v1/calendar', calendarController);

export default app;
