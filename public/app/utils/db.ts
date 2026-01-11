
const DB_NAME = 'VivekanandaSpeechDB';
const AUDIO_STORE = 'audio_chunks';
const DB_VERSION = 2;

export const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject("Error opening database");

    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(AUDIO_STORE)) {
        db.createObjectStore(AUDIO_STORE);
      }
    };
  });
};

export const saveAudioData = async (chunkId: number, data: ArrayBuffer): Promise<void> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([AUDIO_STORE], "readwrite");
    const store = transaction.objectStore(AUDIO_STORE);
    const request = store.put(data, chunkId);
    
    transaction.oncomplete = () => {
        db.close();
        resolve();
    };
    transaction.onerror = () => reject("Error saving audio transaction");
    request.onerror = () => reject("Error saving audio request");
  });
};

export const getAudioData = async (chunkId: number): Promise<ArrayBuffer | null> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([AUDIO_STORE], "readonly");
    const store = transaction.objectStore(AUDIO_STORE);
    const request = store.get(chunkId);
    
    request.onsuccess = () => {
      db.close();
      resolve(request.result ? (request.result as ArrayBuffer) : null);
    };
    request.onerror = () => reject("Error retrieving audio");
  });
};
