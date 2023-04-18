const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        console.log('Connected correctly to server');

        const database = client.db('stayalive');
        const collection = database.collection('users');

        const changeStream = collection.watch();

        changeStream.on('change', (change) => {
            console.log(change);
        });
        return (client);
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}

run().catch(console.dir);
