import express from 'express';
import path from 'path';
import {
  addExerciseToRoutineService,
  createNewRoutineService,
  getAllRoutinesService,
  getRoutineByIdService,
} from '../services/routineService';
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const result = await getAllRoutinesService();
    res.status(200).send(result);
  } catch (error) {
    console.log({
      message: (error as Error).message,
      path: path.join(__dirname, 'getAllRoutinesController'),
    });
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await getRoutineByIdService({id});
    res.status(200).send(result);
  } catch (error) {
    console.log({
      message: (error as Error).message,
      path: path.join(__dirname, 'getRoutineByIdController'),
    });
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const {name, duration} = req.body;
    const result = await createNewRoutineService({name, duration});
    res.status(201).send(result);
  } catch (error) {
    console.log({
      message: (error as Error).message,
      path: path.join(__dirname, 'createNewRoutineController'),
    });
    next(error);
  }
});

router.put('/:id/exercise/add', async (req, res, next) => {
  try {
    const payload = req.body;
    const id = req.params.id;
    const result = await addExerciseToRoutineService({
      id,
      exerciseRoutine: payload,
    });
    res.status(201).send(result);
  } catch (error) {
    console.log({
      message: (error as Error).message,
      path: path.join(__dirname, 'addExercisesToRoutineControlle'),
    });
    next(error);
  }
});

export default router;
