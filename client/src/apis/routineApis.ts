import axios from 'axios';
import {ExerciseFormFields} from '../forms/ExerciseForm';
import {RoutineBasicDetailsFormFields} from '../forms/RoutineBasicDetailsForm';
import {RoutineDayFormFields} from '../forms/RoutineDayForm';
import {WithId, WithMetaData} from '../types/UtilTypes';
import {ExerciseDto} from './exercisesApis';

const routinesAxios = axios.create({
  baseURL: 'http://localhost:3001/api/v1/routines',
});

export interface ExerciseRoutineDto extends RoutineDayFormFields {
  exercise: WithId<ExerciseDto>;
}

export type RoutineDto = WithId<WithMetaData<RoutineBasicDetailsFormFields>> & {
  exerciseRoutines: ExerciseRoutineDto[];
};

export const getAllRoutinesApi = async () => {
  const response = await routinesAxios.get<{data: RoutineDto[]}>('/');
  return response.data.data;
};

export const getRoutineByIdApi = async (id: string) => {
  const response = await routinesAxios.get<{data: RoutineDto}>(`/${id}`);
  return response.data.data;
};

export interface CreateNewRoutineApiParams {
  name: string;
  duration: number;
}

export interface CreateNewRoutineApiResult {
  _id: string;
}

export const createNewRoutineApi = async (
  payload: CreateNewRoutineApiParams
) => {
  const response = await routinesAxios.post<{data: CreateNewRoutineApiResult}>(
    '/',
    payload
  );
  return response.data.data;
};

export interface AddExerciseToRoutineApiPayload {
  id: string;
  dayIndex: number;
  amount: number;
  setCount: number;
  setType: string;
}

export const addExerciseToRoutineApi = async (
  id: string,
  payload: AddExerciseToRoutineApiPayload
) => {
  await routinesAxios.put(`/${id}/exercise/add`, payload);
};
