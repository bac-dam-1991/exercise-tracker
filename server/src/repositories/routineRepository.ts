import path from 'path';
import {aggregate, find, insert, update} from '../adapters/mongo';
import {Int32, ObjectId} from 'mongodb';
import {ExerciseRoutine} from '../types/ExerciseRoutine';

export interface GetRoutineByIdRepoParams {
  id: string;
}

export const getRoutineByIdRepo = async ({id}: GetRoutineByIdRepoParams) => {
  try {
    const cursor = await aggregate('routines', [
      {
        $match: {
          _id: new ObjectId(id),
        },
      },
      {
        $unwind: {path: '$exerciseRoutines', preserveNullAndEmptyArrays: true},
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
        $unwind: {
          path: '$exerciseRoutines.exercise',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: '$_id',
          exerciseRoutines: {
            $push: '$exerciseRoutines',
          },
          updatedAt: {$first: '$updatedAt'},
          createdAt: {$first: '$createdAt'},
          name: {$first: '$name'},
          duration: {$first: '$duration'},
        },
      },
      {
        $addFields: {
          count: {
            $size: '$exerciseRoutines',
          },
        },
      },
    ]);

    const result = await cursor.toArray();

    if (result.length !== 1) {
      throw new Error('Could not find routine with given id.');
    }

    const routine = result[0];

    routine.exerciseRoutines = routine.exerciseRoutines.filter(
      (exercise: Record<string, unknown>) => {
        if (!Object.keys(exercise).length) {
          return false;
        }
        return true;
      }
    );

    return routine;
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
    const cursor = await find('routines');
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

export interface AddExerciseToRoutineRepoParams {
  id: string;
  exerciseRoutine: ExerciseRoutine;
}

export const addExerciseToRoutineRepo = async ({
  id,
  exerciseRoutine,
}: AddExerciseToRoutineRepoParams) => {
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
            ...exerciseRoutine,
            id: new ObjectId(exerciseRoutine.id),
          },
        },
      }
    );
    return result;
  } catch (error) {
    console.log({
      message: (error as Error).message,
      path: path.join(__dirname, 'addExerciseToRoutineRepo'),
    });
    throw error;
  }
};
