import { Injectable } from '@angular/core';
import { openDB, IDBPDatabase, StoreNames } from 'idb';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {
  private dbPromise!: Promise<IDBPDatabase>;

  constructor() {
    this.initDB();
  }

  private async initDB() {
    this.dbPromise = openDB('my-database', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('forms')) {
          db.createObjectStore('forms', { keyPath: 'id', autoIncrement: true });
        }
      }
    });
  }

  async addFormData(name: string, email: string): Promise<void> {
    const db = await this.dbPromise;
    const tx = db.transaction('forms', 'readwrite');
    const store = tx.objectStore('forms');
    await store.add({ name, email });
  }

  async getAllFormData(): Promise<{ name: string, email: string }[]> {
    const db = await this.dbPromise;
    const tx = db.transaction('forms', 'readonly');
    const store = tx.objectStore('forms');
    return store.getAll();
  }
}
