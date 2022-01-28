import {ObjectId} from 'mongodb';
import path from 'path';
import {aggregate, update} from '../../adapters/mongo';
import {addDays} from 'date-fns';

const CALENDARS_COLL = 'calendars';

export interface AddMealToCalendarRepoParams {
  name: string;
  date: string;
  calendarId: string;
}

export const addMealToCalendarRepo = async ({
  name,
  date,
  calendarId,
}: AddMealToCalendarRepoParams) => {
  try {
    const result = await update(
      CALENDARS_COLL,
      {
        _id: new ObjectId(calendarId),
      },
      {
        $push: {
          meals: {name, date},
        },
      }
    );
    return result;
  } catch (error) {
    console.log({
      message: (error as Error).message,
      path: path.join(__dirname, 'addMealToCalendarRepo'),
    });
    throw error;
  }
};

export interface GetMealsForCalendarDaysRepoParams {
  calendarId: string;
  dateFrom: string;
  dateTo: string;
}

export const getMealsForCalendarDaysRepo = async ({
  calendarId,
  dateFrom,
  dateTo,
}: GetMealsForCalendarDaysRepoParams) => {
  try {
    const pipeline = [
      {
        $match: {
          _id: new ObjectId(calendarId),
        },
      },
      {
        $project: {
          meals: 1,
        },
      },
      {
        $unwind: {
          path: '$meals',
          includeArrayIndex: 'index',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          name: '$meals.name',
          date: {
            $toDate: '$meals.date',
          },
        },
      },
      {
        $match: {
          date: {
            $gte: new Date(dateFrom),
            $lt: addDays(new Date(dateTo), 1),
          },
        },
      },
      {
        $project: {
          meals: 0,
        },
      },
    ];
    const cursor = await aggregate(CALENDARS_COLL, pipeline);
    return await cursor.toArray();
  } catch (error) {
    console.log({
      message: (error as Error).message,
      path: path.join(__dirname, 'getMealsForCalendarDaysRepo'),
    });
    throw error;
  }
};
