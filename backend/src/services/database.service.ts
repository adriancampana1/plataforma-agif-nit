import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { users?: mongoDB.Collection } = {};

export async function connectToDataBase() {
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

  await db.command({
    "collMod": usersCollectionName,
    "validator": {
      $jsonSchema: {
        bsonType: "object",
        required: ["username", "email", "password"],
        additionalProperties: false,
        properties: {
          _id: {},
          username: {
            bsonType: "string",
            description: "must be a string and is required"
          },
          email: {
            bsonType: "string",
            description: "must be a string and is required"
          },
          password: {
            bsonType: "string",
            description: "must be a string and is required"
          },
        }
      }
    }
  });

  const usersCollection: mongoDB.Collection = db.collection(usersCollectionName);
  collections.users = usersCollection;

  usersCollection.createIndex({ username: 1 }, { unique: true });
  usersCollection.createIndex({ email: 1 }, { unique: true });

  console.log('Connected to database');
}
