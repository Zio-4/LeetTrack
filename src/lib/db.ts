// Database configuration
import { openDB, DBSchema, IDBPDatabase, deleteDB } from 'idb';

type IDBValidKey = string | number | Date | ArrayBufferView | ArrayBuffer | IDBValidKey[];

const DB_NAME = 'leetTrackDB';
const DB_VERSION = 1;

// Object store names as const literals
export const OBJECT_STORES = {
  USER_PROFILE: 'userProfile',
  RECENT_SUBMISSIONS: 'recentSubmissions',
  CONTEST_RECORDS: 'contestRecords',
  PROBLEMS: 'problems',
  PROBLEM_DETAILS: 'problemDetails',
  DAILY_CHALLENGES: 'dailyChallenges',
  USER_SUBMISSIONS: 'userSubmissions',
  SUBMISSION_DETAILS: 'submissionDetails',
} as const;

// Define database schema types for TypeScript
interface LeetTrackDB extends DBSchema {
  userProfile: {
    key: string;
    value: any;
  };
  recentSubmissions: {
    key: number;
    value: any;
    autoIncrement: true;
  };
  contestRecords: {
    key: string;
    value: any;
  };
  problems: {
    key: string;
    value: any;
  };
  problemDetails: {
    key: string;
    value: any;
  };
  dailyChallenges: {
    key: string;
    value: any;
  };
  userSubmissions: {
    key: string;
    value: any;
  };
  submissionDetails: {
    key: string;
    value: any;
  };
}

// Get a reference to the database
let dbPromise: Promise<IDBPDatabase<LeetTrackDB>> | null = null;

// Initialize and get the database
const getDB = () => {
  if (!dbPromise) {
    dbPromise = openDB<LeetTrackDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        // Create object stores for each data collection if they don't exist
        if (!db.objectStoreNames.contains(OBJECT_STORES.USER_PROFILE)) {
          db.createObjectStore(OBJECT_STORES.USER_PROFILE, { keyPath: 'username' });
        }
        
        if (!db.objectStoreNames.contains(OBJECT_STORES.RECENT_SUBMISSIONS)) {
          db.createObjectStore(OBJECT_STORES.RECENT_SUBMISSIONS, { keyPath: 'id', autoIncrement: true });
        }
        
        if (!db.objectStoreNames.contains(OBJECT_STORES.CONTEST_RECORDS)) {
          db.createObjectStore(OBJECT_STORES.CONTEST_RECORDS, { keyPath: 'username' });
        }
        
        if (!db.objectStoreNames.contains(OBJECT_STORES.PROBLEMS)) {
          db.createObjectStore(OBJECT_STORES.PROBLEMS, { keyPath: 'titleSlug' });
        }
        
        if (!db.objectStoreNames.contains(OBJECT_STORES.PROBLEM_DETAILS)) {
          db.createObjectStore(OBJECT_STORES.PROBLEM_DETAILS, { keyPath: 'titleSlug' });
        }
        
        if (!db.objectStoreNames.contains(OBJECT_STORES.DAILY_CHALLENGES)) {
          db.createObjectStore(OBJECT_STORES.DAILY_CHALLENGES, { keyPath: 'date' });
        }
        
        if (!db.objectStoreNames.contains(OBJECT_STORES.USER_SUBMISSIONS)) {
          db.createObjectStore(OBJECT_STORES.USER_SUBMISSIONS, { keyPath: 'id' });
        }
        
        if (!db.objectStoreNames.contains(OBJECT_STORES.SUBMISSION_DETAILS)) {
          db.createObjectStore(OBJECT_STORES.SUBMISSION_DETAILS, { keyPath: 'id' });
        }
      },
    });
  }
  return dbPromise;
};

// Generic function to add data to a store
export const addToStore = async <T>(
  storeName: string, 
  data: T
): Promise<IDBValidKey> => {
  const db = await getDB();
  return db.add(storeName as any, data);
};

// Generic function to update data in a store
export const updateStore = async <T>(
  storeName: string, 
  data: T
): Promise<IDBValidKey> => {
  const db = await getDB();
  return db.put(storeName as any, data);
};

// Generic function to get data from a store
export const getFromStore = async <T>(
  storeName: string, 
  key: string | number
): Promise<T | undefined> => {
  const db = await getDB();
  return db.get(storeName as any, key);
};

// Generic function to delete data from a store
export const deleteFromStore = async (
  storeName: string, 
  key: string | number
): Promise<void> => {
  const db = await getDB();
  await db.delete(storeName as any, key);
};

// Get all items from a store
export const getAllFromStore = async <T>(
  storeName: string
): Promise<T[]> => {
  const db = await getDB();
  return db.getAll(storeName as any);
};

// Get all items from a store by index
export const getAllFromIndex = async <T>(
  storeName: string,
  indexName: string,
  key: string | number
): Promise<T[]> => {
  const db = await getDB();
  // @ts-expect-error -- Why is indexName type of Never?
  return db.getAllFromIndex(storeName as any, indexName, key);
};

// Clear a store
export const clearStore = async (
  storeName: string
): Promise<void> => {
  const db = await getDB();
  await db.clear(storeName as any);
};

// Delete the entire database
export const deleteDatabase = async (): Promise<void> => {
  // Reset the db promise
  dbPromise = null;
  
  // Delete the database
  await deleteDB(DB_NAME);
}; 