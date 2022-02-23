// import mongoose from 'mongoose';

// const MONGO_URI = process.env.MONGO_URI

// export interface IDatabase {
//     init(): void;
// }

// export default class Database implements IDatabase {
//     connectionString: string;

//     constructor(connectionString: string) {
//         this.connectionString = connectionString;
//     }

//     init(): void {
//         try {
//             mongoose.connect(MONGO_URI);
//         } catch (error) {
//             throw Error(error)
//         }
//     }
// }


import mongoose from 'mongoose';
const { MongoMemoryServer } = require('mongodb-memory-server');
let node_env = process.env.NODE_ENV;

const MONGO_URI = process.env.MONGO_URI

export interface IDatabase {
    init(): Promise<void>,
    closeDatabase(): Promise<void>,
    clearDatabase(): Promise<void>
}

export default class Database implements IDatabase {
    connectionString: string;

    constructor(connectionString: string) {
        this.connectionString = connectionString;
    }

    async init(): Promise<void> {
        try {
            if(node_env === 'test'){
                const mongod = await MongoMemoryServer.create();
                const uri = await mongod.getUri();

                const mongooseOpts = {
                    useNewUrlParser: true,
                    autoReconnect: true,
                    reconnectTries: Number.MAX_VALUE,
                    reconnectInterval: 1000
                };
                await mongoose.connect(uri, mongooseOpts);
            }
            mongoose.connect(MONGO_URI);
        } catch (error) {
            throw Error(error);
        }
    }
    async closeDatabase(): Promise<void> {
        try {
            const mongod = await MongoMemoryServer.create();
            await mongoose.connection.dropDatabase();
            await mongoose.connection.close();
            await mongod.stop();
        } catch (error) {
            throw Error(error);
        }
    }
    async clearDatabase(): Promise<void> {
        try {
            const collections = mongoose.connection.collections;

            for (const key in collections) {
                const collection = collections[key];
                await collection.deleteMany({});
            }
        } catch (error) {
            throw Error(error);
        }
    }
}