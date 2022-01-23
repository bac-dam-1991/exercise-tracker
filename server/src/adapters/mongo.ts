import {
  AggregateOptions,
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

export const aggregate = async (
  coll: string,
  pipeline: Document[],
  options?: AggregateOptions
) => {
  const client = await getMongoClient();
  try {
    const db = client.db('exercise-tracker');
    return await db.collection(coll).aggregate(pipeline, options);
  } catch (error) {
    console.log({
      message: (error as Error).message,
      path: path.join(__dirname, 'aggregate'),
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
    const nowTs = new Date().toISOString();
    const db = client.db('exercise-tracker');
    return await db
      .collection(coll)
      .insertOne({...doc, createdAt: nowTs, updatedAt: nowTs});
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

export const update = async <TSchema extends Document = Document>(
  coll: string,
  filter: Filter<Document>,
  options: UpdateFilter<TSchema>
) => {
  const client = await getMongoClient();
  try {
    const db = client.db('exercise-tracker');
    return await db.collection(coll).updateOne(filter, options);
  } catch (error) {
    console.log({
      message: (error as Error).message,
      path: path.join(__dirname, 'update'),
    });
    throw error;
  }
};
