import express from 'express';
import exerciseController from './controllers/exerciseController';
import routineController from './controllers/routineController';
import cors from 'cors';
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/v1/exercises', exerciseController);
app.use('/api/v1/routines', routineController);

export default app;
