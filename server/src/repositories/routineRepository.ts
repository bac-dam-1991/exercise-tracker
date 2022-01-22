import path from 'path';
import {aggregate, find, insert, update} from '../adapters/mongo';
import {Int32, ObjectId} from 'mongodb';
import {ExerciseRoutine} from '../types/ExerciseRoutine';

export interface GetRoutineByIdRepoParams {
  id: string;
}

export const getRoutineByIdRepo = async ({id}: GetRoutineByIdRepoParams) => {
  try {
    const cursor = await find('routines', {
      _id: new ObjectId(id),
    });
    const result = await cursor.toArray();
    if (result.length !== 1) {
      throw new Error('Could not find routine with given id.');
    }
    return result[0];
  } catch (error) {
    console.log({
      message: (error as Error).message,
      path: path.join(__dirname, 'getRoutineByIdRepo'),
    });
    throw error;
  }
};

export const getAllRoutinesRepo = async () => {
  try {
    const cursor = await aggregate('routines', [
      {
        $unwind: '$exerciseRoutines',
      },
      {
        $lookup: {
          from: 'exercises',
          localField: 'exerciseRoutines.id',
          foreignField: '_id',
          as: 'exerciseRoutines.exercise',
        },
      },
      {
        $unwind: '$exerciseRoutines.exercise',
      },
      {
        $group: {
          _id: '$_id',
          exerciseRoutines: {$push: '$exerciseRoutines'},
          updatedAt: {$first: '$updatedAt'},
          createdAt: {$first: '$createdAt'},
          name: {$first: '$name'},
          duration: {$first: '$duration'},
        },
      },
    ]);

    const result = await cursor.toArray();
    return result;
  } catch (error) {
    console.log({
      message: (error as Error).message,
      path: path.join(__dirname, 'getAllRoutinesRepo'),
    });
    throw error;
  }
};

export interface CreateNewRoutineRepoParams {
  name: string;
  duration: number;
}

export const createNewRoutineRepo = async ({
  name,
  duration,
}: CreateNewRoutineRepoParams) => {
  try {
    const result = await insert('routines', {
      name,
      duration: new Int32(duration),
      exerciseRoutines: [],
    });
    return result;
  } catch (error) {
    console.log({
      message: (error as Error).message,
      path: path.join(__dirname, 'createNewRoutineRepo'),
    });
    throw error;
  }
};

export interface AddExercisesToRoutineRepoParams {
  id: string;
  exerciseRoutines: ExerciseRoutine[];
}

export const addExercisesToRoutineRepo = async ({
  id,
  exerciseRoutines,
}: AddExercisesToRoutineRepoParams) => {
  try {
    const nowTs = new Date().toISOString();
    const result = await update(
      'routines',
      {_id: new ObjectId(id)},
      {
        $set: {
          updatedAt: nowTs,
        },
        $push: {
          exerciseRoutines: {
            $each: exerciseRoutines.map((routine) => {
              return {
                ...routine,
                id: new ObjectId(routine.id),
              };
            }),
          },
        },
      }
    );
    return result;
  } catch (error) {
    console.log({
      message: (error as Error).message,
      path: path.join(__dirname, 'addExercisesToRoutineRepo'),
    });
    throw error;
  }
};
