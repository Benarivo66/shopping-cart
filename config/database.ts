import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI

export interface IDatabase {
    init(): void;
}

export default class Database implements IDatabase {
    connectionString: string;

    constructor(connectionString: string) {
        this.connectionString = connectionString;
    }

    init(): void {
        try {
            mongoose.connect(MONGO_URI);
        } catch (error) {
            throw Error(error)
        }
    }
}