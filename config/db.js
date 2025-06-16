const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://franktinongbe86:CWPWULPZ2ZfioULt@cluster0.vp8mrza.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

let db;

async function connectToDatabase() {
    const client = new MongoClient(uri);
    await client.connect();
    db = client.db('LocaBase'); // Remplacez par le nom de votre DB
    console.log("Connecté à MongoDB Atlas!");
    return db;
}

function getDb() {
    return db;
}

module.exports = { connectToDatabase, getDb };