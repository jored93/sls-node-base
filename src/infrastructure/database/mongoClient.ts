// src/infrastructure/db/mongoClient.ts
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

let isConnected = false;

export const connectToDatabase = async () => {
  if (!isConnected) {
    await client.connect();
    isConnected = true;
  }
  return client.db(); // usa la DB por defecto del URI
};
