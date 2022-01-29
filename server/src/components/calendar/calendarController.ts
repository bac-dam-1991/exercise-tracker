import express from 'express';
import path from 'path';
import {
  addMealToCalendarService,
  getMealsForCalendarDaysService,
} from './calendarService';
const router = express.Router();

router.post('/:calendarId/meals', async (req, res, next) => {
  try {
    const {date, name, description, mealType} = req.body;
    const {calendarId} = req.params;
    const result = await addMealToCalendarService({
      name,
      date,
      calendarId,
      description,
      mealType,
    });
    res.status(201).send({data: result});
  } catch (error) {
    console.log({
      message: (error as Error).message,
      path: path.join(__dirname, 'addMealToCalendarController'),
    });
    next(error);
  }
});

router.get('/:calendarId/meals', async (req, res, next) => {
  try {
    const {calendarId} = req.params;
    const {dateFrom, dateTo} = req.query;
    const result = await getMealsForCalendarDaysService({
      calendarId,
      dateFrom: dateFrom as string,
      dateTo: dateTo as string,
    });
    res.status(201).send({data: result});
  } catch (error) {
    console.log({
      message: (error as Error).message,
      path: path.join(__dirname, 'getMealsForCalendarDaysController'),
    });
    next(error);
  }
});

export default router;
