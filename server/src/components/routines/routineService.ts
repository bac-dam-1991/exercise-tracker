import {
  addExerciseToRoutineRepo,
  createNewRoutineRepo,
  getAllRoutinesRepo,
  getRoutineByIdRepo,
} from './routineRepository';
import path from 'path';
import {ExerciseRoutine} from '../../types/ExerciseRoutine';

export const getAllRoutinesService = async () => {
  try {
    const result = await getAllRoutinesRepo();
    return result;
  } catch (error) {
    console.log({
      message: (error as Error).message,
      path: path.join(__dirname, 'getAllRoutinesService'),
    });
    throw error;
  }
};

export interface GetRoutineByIdServiceParams {
  id: string;
}

export const getRoutineByIdService = async ({
  id,
}: GetRoutineByIdServiceParams) => {
  try {
    const result = await getRoutineByIdRepo({id});
    return result;
  } catch (error) {
    console.log({
      message: (error as Error).message,
      path: path.join(__dirname, 'getRoutineByIdService'),
    });
    throw error;
  }
};

export interface CreateNewRoutineServiceParams {
  name: string;
  duration: number;
}

export interface CreateNewRoutineServiceResult {
  _id: string;
}

export const createNewRoutineService = async ({
  name,
  duration,
}: CreateNewRoutineServiceParams): Promise<CreateNewRoutineServiceResult> => {
  try {
    const result = await createNewRoutineRepo({name, duration});
    return {_id: result.insertedId.toString()};
  } catch (error) {
    console.log({
      message: (error as Error).message,
      path: path.join(__dirname, 'createNewRoutineService'),
    });
    throw error;
  }
};

export interface AddExerciseToRoutineService {
  id: string;
  exerciseRoutine: ExerciseRoutine;
}

export const addExerciseToRoutineService = async ({
  id,
  exerciseRoutine,
}: AddExerciseToRoutineService) => {
  try {
    const result = await addExerciseToRoutineRepo({id, exerciseRoutine});
    return result;
  } catch (error) {
    console.log({
      message: (error as Error).message,
      path: path.join(__dirname, 'addExercisesToRoutineService'),
    });
    throw error;
  }
};
