import path from 'path';
import {
  addMealToCalendarRepo,
  getMealsForCalendarDaysRepo,
} from './calendarRepository';

export interface AddMealToCalendarServiceParams {
  name: string;
  date: string;
  calendarId: string;
}

export const addMealToCalendarService = async ({
  name,
  date,
  calendarId,
}: AddMealToCalendarServiceParams) => {
  try {
    const result = await addMealToCalendarRepo({name, date, calendarId});
    return result;
  } catch (error) {
    console.log({
      message: (error as Error).message,
      path: path.join(__dirname, 'addMealToCalendarService'),
    });
    throw error;
  }
};

export interface GetMealsForCalendarDaysServiceParams {
  calendarId: string;
  dateFrom: string;
  dateTo: string;
}

export const getMealsForCalendarDaysService = async ({
  calendarId,
  dateFrom,
  dateTo,
}: GetMealsForCalendarDaysServiceParams) => {
  try {
    const result = await getMealsForCalendarDaysRepo({
      dateFrom,
      dateTo,
      calendarId,
    });
    return result;
  } catch (error) {
    console.log({
      message: (error as Error).message,
      path: path.join(__dirname, 'getMealsForCalendarDaysService'),
    });
    throw error;
  }
};
