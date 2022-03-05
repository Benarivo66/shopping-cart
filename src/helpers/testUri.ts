const { MongoMemoryServer } = require('mongodb-memory-server');

export default async function getTestUri() {
    const mongod = await MongoMemoryServer.create();
    const uri = await mongod.getUri();
    process.env.MONGO_URI = uri;
};

