import axios from 'axios';

const exerciseAxios = axios.create({
  baseURL: 'http://localhost:3001/api/v1/exercises',
});

export interface ExerciseDto {
  _id: string;
  name: string;
}

export interface ExercisePayload {
  name: string;
}

export const getAllExercisesApi = async (): Promise<ExerciseDto[]> => {
  const response = await exerciseAxios.get<{data: ExerciseDto[]}>('/');
  return response.data.data;
};

export const getExerciseById = async (id: string): Promise<ExerciseDto> => {
  const response = await exerciseAxios.get<{data: ExerciseDto}>(`/${id}`);
  return response.data.data;
};

export const deleteExerciseByIdApi = async (id: string): Promise<void> => {
  await exerciseAxios.delete(`/${id}`);
};

export const insertNewExerciseApi = async (
  payload: ExercisePayload
): Promise<ExerciseDto> => {
  const response = await exerciseAxios.post<{data: ExerciseDto}>('/', payload);
  return response.data.data;
};

export const updateExerciseApi = async (
  id: string,
  payload: ExercisePayload
): Promise<void> => {
  await exerciseAxios.put(`/${id}`, payload);
};
