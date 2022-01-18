import {useSnackbar} from 'notistack';
import {useCallback, useState} from 'react';
import {
  ExerciseDto,
  getAllExercisesApi,
  getExerciseById,
} from '../apis/exercisesApis';

export const useLoadAllExercises = () => {
  const [exercises, setExercises] = useState<ExerciseDto[]>([]);
  const {enqueueSnackbar} = useSnackbar();
  const [loading, setLoading] = useState<boolean>(false);
  const loadAllExercises = useCallback(async () => {
    try {
      const data = await getAllExercisesApi();
      setExercises(data);
    } catch (error) {
      enqueueSnackbar((error as Error).message, {variant: 'error'});
    } finally {
      setLoading(false);
    }
  }, [enqueueSnackbar]);

  return {exercises, loadAllExercises, loading};
};

export const useLoadExerciseById = () => {
  const [exercise, setExercise] = useState<ExerciseDto | null>(null);
  const {enqueueSnackbar} = useSnackbar();
  const [loading, setLoading] = useState<boolean>(false);
  const loadExerciseById = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        const data = await getExerciseById(id);
        setExercise(data);
      } catch (error) {
        enqueueSnackbar((error as Error).message, {variant: 'error'});
      } finally {
        setLoading(false);
      }
    },
    [enqueueSnackbar]
  );

  return {exercise, loadExerciseById, loading};
};
