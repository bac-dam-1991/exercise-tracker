import axios from 'axios';

const calendarAxios = axios.create({
  baseURL: 'http://localhost:3001/api/v1/calendar',
});

export interface MealDto {
  _id: string;
  index: number;
  name: string;
  date: string;
}

export interface GetMealsForCalendarDaysApiParams {
  id: string;
  dateFrom: string;
  dateTo: string;
}

export const getMealsForCalendarDaysByIdApi = async ({
  id,
  dateFrom,
  dateTo,
}: GetMealsForCalendarDaysApiParams) => {
  const params = new URLSearchParams();
  params.append('dateFrom', dateFrom);
  params.append('dateTo', dateTo);
  const response = await calendarAxios.get<{data: MealDto[]}>(`/${id}/meals`, {
    params,
  });
  return response.data.data;
};
