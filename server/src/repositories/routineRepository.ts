import path from 'path';
import {find, insert} from '../adapters/mongo';
import {Int32, ObjectId} from 'mongodb';

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
