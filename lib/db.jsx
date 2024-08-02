import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://lili:aaChrfU2Jzbj5ehw@cluster0.owfwwys.mongodb.net/management?retryWrites=true&w=majority&appName=Cluster0"
  );

  return client;
}
