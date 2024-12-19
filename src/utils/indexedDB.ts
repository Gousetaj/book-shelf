import { openDB } from 'idb';

const dbName = 'bookshelfApp';
const storeName = 'users';

export const initDB = async () => {
  const db = await openDB(dbName, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'email' });
      }
    },
  });
  return db;
};

export const addUser = async (user: { email: string; password: string }) => {
  const db = await initDB();
  await db.add(storeName, user);
};

export const getUser = async (email: string) => {
  const db = await initDB();
  return await db.get(storeName, email);
};
