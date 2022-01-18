import {
  Document,
  Filter,
  FindOneAndDeleteOptions,
  FindOptions,
  MongoClient,
  OptionalUnlessRequiredId,
  UpdateFilter,
} from 'mongodb';
import path from 'path';

export const getMongoClient = async () => {
  try {
    const client = new MongoClient(
      'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000'
    );
    return await client.connect();
  } catch (error) {
    console.log({
      message: (error as Error).message,
      path: path.join(__dirname, 'getMongoClient'),
    });
    throw error;
  }
};

export const find = async (
  coll: string,
  filter: Filter<Document> = {},
  options?: FindOptions
) => {
  const client = await getMongoClient();
  try {
    const db = client.db('exercise-tracker');
    return await db.collection(coll).find(filter, options);
  } catch (error) {
    console.log({
      message: (error as Error).message,
      path: path.join(__dirname, 'find'),
    });
    throw error;
  }
};

export const insert = async (
  coll: string,
  doc: OptionalUnlessRequiredId<Document>
) => {
  const client = await getMongoClient();
  try {
    const db = client.db('exercise-tracker');
    return await db.collection(coll).insertOne(doc);
  } catch (error) {
    console.log({
      message: (error as Error).message,
      path: path.join(__dirname, 'update'),
    });
    throw error;
  }
};

export const remove = async (
  coll: string,
  filter: Filter<Document>,
  options: FindOneAndDeleteOptions = {}
) => {
  const client = await getMongoClient();
  try {
    const db = client.db('exercise-tracker');
    return await db.collection(coll).findOneAndDelete(filter, options);
  } catch (error) {
    console.log({
      message: (error as Error).message,
      path: path.join(__dirname, 'remove'),
    });
    throw error;
  }
};

export const update = async (
  coll: string,
  filter: Filter<Document>,
  options: UpdateFilter<Document>
) => {
  const client = await getMongoClient();
  try {
    const db = client.db('exercise-tracker');
    return await db.collection(coll).findOneAndUpdate(filter, options);
  } catch (error) {
    console.log({
      message: (error as Error).message,
      path: path.join(__dirname, 'update'),
    });
    throw error;
  }
};
