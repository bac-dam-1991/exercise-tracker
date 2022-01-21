import axios from 'axios';

const routinesAxios = axios.create({
  baseURL: 'http://localhost:3001/api/v1/routines',
});

export interface RoutineDto {
  _id: string;
  name: string;
  duration: number;
}

export const getAllRoutinesApi = async () => {
  const response = await routinesAxios.get<RoutineDto[]>('/');
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
