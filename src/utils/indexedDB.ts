import { openDB } from 'idb';

const dbName = 'bookshelfApp';
const userStoreName = 'users';
const bookStoreName = 'books';

export const initDB = async () => {
  const db = await openDB(dbName, 2, { // Increment the version
    upgrade(db) {
      if (!db.objectStoreNames.contains(userStoreName)) {
        db.createObjectStore(userStoreName, { keyPath: 'email' });
      }
      if (!db.objectStoreNames.contains(bookStoreName)) {
        db.createObjectStore(bookStoreName, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
  return db;
};

export const addUser = async (user: { email: string; password: string }) => {
  const db = await initDB();
  await db.add(userStoreName, user);
};

export const getUser = async (email: string) => {
  const db = await initDB();
  return await db.get(userStoreName, email);
};

export const addBook = async (book: { title: string; author: string }) => {
  const db = await initDB();
  await db.add(bookStoreName, book);
};

export const getAllBooks = async () => {
  const db = await initDB();
  return await db.getAll(bookStoreName);
};
// Method to delete a book by ID
export const deleteBook = async (id: number) => {
  const db = await initDB();
  await db.delete(bookStoreName, id); // Delete a book by its ID from the store
};

// Method to update a book
export const updateBook = async (book: { id: number; title: string; author: string }) => {
  const db = await initDB();
  const existingBook = await db.get(bookStoreName, book.id); // Fetch the book by ID

  if (existingBook) {
    // If the book exists, update it
    await db.put(bookStoreName, book); // Put (update) the book in the store
  } else {
    throw new Error('Book not found'); // Handle case where the book doesn't exist
  }
};