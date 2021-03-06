import express from 'express';
import {ObjectId} from 'mongodb';
import {find, insert, remove, update} from '../../adapters/mongo';
import path from 'path';
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const cursor = await find('exercises');
    const result = await cursor.toArray();
    res.status(200).send({data: result});
  } catch (error) {
    console.log({
      message: (error as Error).message,
      path: path.join(__dirname, 'getExercisesController'),
    });
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const cursor = await find('exercises', {_id: new ObjectId(id)});
    const result = await cursor.toArray();
    if (result.length !== 1) {
      throw new Error('Could not find exercise with given id.');
    }
    res.status(200).send({data: result[0]});
  } catch (error) {
    console.log({
      message: (error as Error).message,
      path: path.join(__dirname, 'getExerciseByIdController'),
    });
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const {name} = req.body;
    const result = await insert('exercises', {
      name,
    });
    res.status(201).send({data: result});
  } catch (error) {
    console.log({
      message: (error as Error).message,
      path: path.join(__dirname, 'insertExerciseController'),
    });
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await remove('exercises', {
      _id: new ObjectId(id),
    });
    res.status(201).send({data: result});
  } catch (error) {
    console.log({
      message: (error as Error).message,
      path: path.join(__dirname, 'deleteExerciseController'),
    });
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const {name} = req.body;
    const result = await update(
      'exercises',
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          name,
        },
      }
    );
    res.status(200).send({data: result});
  } catch (error) {
    console.log({
      message: (error as Error).message,
      path: path.join(__dirname, 'updateExerciseController'),
    });
    next(error);
  }
});

export default router;
