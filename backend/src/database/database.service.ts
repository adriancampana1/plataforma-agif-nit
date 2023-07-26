import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { users?: mongoDB.Collection, addresses?: mongoDB.Collection } = {};

export async function connectToDataBase() {
  dotenv.config();

  const mongoUri = process.env.MONGO_URI;
  const usersCollectionName = process.env.USERS_COLLECTION_NAME;
  const addressCollectionName = process.env.ADDRESS_COLLECTION_NAME;

  if (!mongoUri) {
    throw new Error('MONGO_URI is not defined in the environment variables');
  }

  if (!usersCollectionName) {
    throw new Error('USERS_COLLECTION_NAME is not defined in the environment variables');
  }

  if (!addressCollectionName) {
    throw new Error('ADDRESS_COLLECTION_NAME is not defined in the environment variables');
  }

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(mongoUri);
  await client.connect();
  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  const usersCollection: mongoDB.Collection = db.collection(usersCollectionName);
  collections.users = usersCollection;
  usersCollection.createIndex({ email: 1 }, { unique: true });

  const addressCollection: mongoDB.Collection = db.collection(addressCollectionName);
  collections.addresses = addressCollection;
  addressCollection.createIndex({ zip_code: 1 });

  await db.command({
    "collMod": usersCollectionName,
    "validator": {
      $jsonSchema: {
        bsonType: "object",
        required: ["username", "email", "password", "created_at", "updated_at"],
        additionalProperties: false,
        properties: {
          _id: {},
          role: {
            bsonType: "string",
            description: "must be a string and is required"
          },
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
          created_at: {
            bsonType: "date",
            description: "must be a date and is required"
          },
          updated_at: {
            bsonType: "date",
            description: "must be a date and is required"
          }
        }
      }
    }
  });

  await db.command({
    "collMod": addressCollectionName,
    "validator": {
      $jsonSchema: {
        bsonType: "object",
        required: ["zip_code", "number", "complement", "street", "district", "city", "created_at", "updated_at"],
        additionalProperties: false,
        properties: {
          _id: {},
          zip_code: {
            bsonType: "string",
            description: "must be a string and is required"
          },
          number: {
            bsonType: "int",
            description: "must be an int and is required"
          },
          complement: {
            bsonType: "string",
            description: "must be a string and is required"
          },
          street: {
            bsonType: "string",
            description: "must be a string and is required"
          },
          district: {
            bsonType: "string",
            description: "must be a string and is required"
          },
          city: {
            bsonType: "string",
            description: "must be a string and is required"
          },
          created_at: {
            bsonType: "date",
            description: "must be a date and is required"
          },
          updated_at: {
            bsonType: "date",
            description: "must be a date and is required"
          }
        }
      }
    }
  });

  console.log('Connected to database');
}
