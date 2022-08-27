import { Injectable } from '@angular/core';
import { DBSchema, IDBPDatabase, openDB } from 'idb';
import { Appointment } from '../../interfaces/appointment/appointment';
import { NewUser } from '../../interfaces/auth/new-user';

interface MyDbSchema extends DBSchema {
    'appointments': {
        key: string;
        value: Appointment;
        indexes: {
            'appointmentId': string;
            'date': string;
            'startTime': string;
        }
    },
    'users': {
        key: string;
        value: NewUser;
        indexes: {
            'userId': string;
            'userName': string;
            'email': string;
        }
    },
}

export class AccutraxIDB {
    db: IDBPDatabase<MyDbSchema>;

    async initIDB() {
        this.db = await openDB<MyDbSchema>('AccutraxIDB', 1, {
            upgrade(db) {
                const apptStore = db.createObjectStore('appointments', {
                    keyPath: 'appointmentId'
                });
                apptStore.createIndex('appointmentId', 'appointmentId', { unique: true });
                apptStore.createIndex('date', 'date', { unique: false });
                apptStore.createIndex('startTime', 'startTime', { unique: false });

                const userStore = db.createObjectStore('users', {
                    keyPath: 'userId'
                });
                userStore.createIndex('userId', 'userId', { unique: true });
                userStore.createIndex('userName', 'userName', { unique: true });
                userStore.createIndex('email', 'email', { unique: true });
            }
        });
    }

    async getUser(userId: string): Promise<NewUser | undefined> {
        return await this.db.get('users', userId);
    }

    async addUser(user: NewUser): Promise<string> {
        return await this.db.add('users', user);
    }

    async deleteUser(userId: string) {
        await this.db.delete('users', userId);
    }

    async updateUser(user: NewUser) {
        await this.db.put('users', user);
    }

    constructor() {
        this.initIDB();
    }
}

export const idb = new AccutraxIDB();

