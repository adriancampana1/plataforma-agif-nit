import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { users?: mongoDB.Collection } = {};

export async function connectToDataBase () {
  dotenv.config();

  const mongoUri = process.env.MONGO_URI;
  const usersCollectionName = process.env.USERS_COLLECTION_NAME;

  if (!mongoUri) {
    throw new Error('MONGO_URI is not defined in the environment variables');
  }

  if (!usersCollectionName) {
    throw new Error('USERS_COLLECTION_NAME is not defined in the environment variables');
  }

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(mongoUri);
  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);
  
  const usersCollection: mongoDB.Collection = db.collection(usersCollectionName);
  collections.users = usersCollection;
  
  console.log('Connected to database');
}