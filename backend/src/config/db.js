const { MongoClient, ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose")

// const uri = "mongodb+srv://biswajitProject:i9uOw4eoP6rCyud4@cluster0.guqb5eu.mongodb.net/foodzosh";
const uri = "mongodb://127.0.0.1:27017/foodzosh";
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

async function connectToDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
  return mongoose.connect(uri)
}

module.exports = connectToDB;


