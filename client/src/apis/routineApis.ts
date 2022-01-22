import axios from 'axios';
import {RoutineBasicDetailsFormFields} from '../forms/RoutineBasicDetailsForm';
import {ExerciseRoutine} from '../forms/RoutineDayForm';
import {WithId, WithMetaData} from '../types/UtilTypes';

const routinesAxios = axios.create({
  baseURL: 'http://localhost:3001/api/v1/routines',
});

export type RoutineDto = WithId<WithMetaData<RoutineBasicDetailsFormFields>> & {
  exerciseRoutines: WithId<ExerciseRoutine>[];
};

export const getAllRoutinesApi = async () => {
  const response = await routinesAxios.get<RoutineDto[]>('/');
  console.log(response.data);
  return response.data;
};

export const getRoutineByIdApi = async (id: string) => {
  const response = await routinesAxios.get<RoutineDto>(`/${id}`);
  return response.data;
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
  const response = await routinesAxios.post<CreateNewRoutineApiResult>(
    '/',
    payload
  );
  return response.data;
};
