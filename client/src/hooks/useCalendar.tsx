import {useSnackbar} from 'notistack';
import {useCallback, useState} from 'react';
import {getMealsForCalendarDaysByIdApi, MealDto} from '../apis/calendarApis';

export interface LoadMealsForCalendarDaysParams {
  id: string;
  dateFrom: string;
  dateTo: string;
}

export const useLoadMealsForCalendarDaysById = () => {
  const [meals, setMeals] = useState<MealDto[]>([]);
  const {enqueueSnackbar} = useSnackbar();
  const [loading, setLoading] = useState<boolean>(false);
  const loadMealsForCalendarDays = useCallback(
    async ({id, dateFrom, dateTo}: LoadMealsForCalendarDaysParams) => {
      try {
        setLoading(true);
        const data = await getMealsForCalendarDaysByIdApi({
          id,
          dateTo,
          dateFrom,
        });
        console.log(data);
        setMeals(data);
      } catch (error) {
        enqueueSnackbar((error as Error).message, {variant: 'error'});
      } finally {
        setLoading(false);
      }
    },
    [enqueueSnackbar]
  );

  return {meals, loadMealsForCalendarDays, loading};
};
