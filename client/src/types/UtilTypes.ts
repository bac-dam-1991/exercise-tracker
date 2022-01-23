export type WithId<T> = T & {_id: string};
export type WithMetaData<T> = T & {createdAt: string; updatedAt: string};
