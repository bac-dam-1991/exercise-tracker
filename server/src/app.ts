import express from 'express';
import exerciseController from './controllers/exerciseController';
import cors from 'cors';
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/v1/exercises', exerciseController);

export default app;
