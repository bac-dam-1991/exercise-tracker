import {useSnackbar} from 'notistack';
import {useCallback, useState} from 'react';
import {
  getAllRoutinesApi,
  getRoutineByIdApi,
  RoutineDto,
} from '../apis/routineApis';

export const useLoadAllRoutines = () => {
  const [routines, setRoutines] = useState<RoutineDto[]>([]);
  const {enqueueSnackbar} = useSnackbar();
  const [loading, setLoading] = useState<boolean>(false);
  const loadAllRoutines = useCallback(async () => {
    try {
      const data = await getAllRoutinesApi();
      setRoutines(data);
    } catch (error) {
      enqueueSnackbar((error as Error).message, {variant: 'error'});
    } finally {
      setLoading(false);
    }
  }, [enqueueSnackbar]);

  return {routines, loadAllRoutines, loading};
};

export const useLoadRoutineById = () => {
  const [routine, setRoutine] = useState<RoutineDto | null>(null);
  const {enqueueSnackbar} = useSnackbar();
  const [loading, setLoading] = useState<boolean>(false);
  const loadRoutineById = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        const data = await getRoutineByIdApi(id);
        setRoutine(data);
      } catch (error) {
        enqueueSnackbar((error as Error).message, {variant: 'error'});
      } finally {
        setLoading(false);
      }
    },
    [enqueueSnackbar]
  );

  return {routine, loadRoutineById, loading};
};
