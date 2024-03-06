import * as mongodb from "mongodb";
import { User } from "./user";
import { Module } from "./module";
import { Video } from "./video";
import { QuestionOptionsAnswer } from "./questionoptionsanswer";

//Export all the collections here
export const collections: {
  user?: mongodb.Collection<User>;
  module?: mongodb.Collection<Module>;
  video?: mongodb.Collection<Video>;
  questionoptionsanswer?: mongodb.Collection<QuestionOptionsAnswer>;
} = {};

//Associate the database name and each individual collection here
export async function connectToDatabase(uri: string) {
  const client = new mongodb.MongoClient(uri);
  await client.connect();

  const db = client.db("LearningApp");
  await applySchemaValidation(db);
 
  const userCollection = db.collection<User>("user");
  collections.user = userCollection;

  const moduleCollection = db.collection<Module>("module");
  collections.module = moduleCollection;

  const videoCollection = db.collection<Video>("video");
  collections.video = videoCollection;

  const questionoptionsanswerCollection = db.collection<QuestionOptionsAnswer>("questionoptionsanswer");
  collections.questionoptionsanswer = questionoptionsanswerCollection;
}

async function applySchemaValidation(db: mongodb.Db) {
  const userSchema = {
    $jsonSchema: {
      bsonType: "object",
      required: ["email", "password"],
      additionalProperties: false,
      properties: {
        _id: {},
        email: {
          bsonType: "string",
          description: "'email' is required and is a string",
        },
        password: {
          bsonType: "string",
          description: "'password' is required, is a string, and has a min length of 5 characters",
          minLength: 5,
        },
      },
    },
  };

  const moduleSchema = {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "moduleNumber"],
      additionalProperties: false,
      properties: {
        _id: {},
        name: {
          bsonType: "string",
          description: "'name' is required and is a string",
        },
        moduleNumber: {
          bsonType: "number",
          description: "'moduleNumber' is required and is a number",
        },
      },
    },
  };

  const videoSchema = {
    $jsonSchema: {
      bsonType: "object",
      required: ["moduleID", "videoAndQuizPageID", "videoID"],
      additionalProperties: false,
      properties: {
        _id: {},
        moduleID: {
          bsonType: "number",
          description: "'moduleID' is required and is a number",
        },
        videoAndQuizPageID: {
          bsonType: "number",
          description: "'videoAndQuizPageID' is required and is a number",
        },
        videoID: {
          bsonType: "string",
          description: "'videoID' is required and is a string",
        },
      },
    },
  };

  const questionoptionsanswerSchema = {
    $jsonSchema: {
      bsonType: "object",
      required: ["moduleID", "videoAndQuizPageID", "question", "options", "answer"],
      additionalProperties: false,
      properties: {
        _id: {},
        moduleID: {
          bsonType: "number",
          description: "'moduleID' is required and is a number",
        },
        videoAndQuizPageID: {
          bsonType: "number",
          description: "'videoAndQuizPageID' is required and is a number",
        },
        question: {
          bsonType: "string",
          description: "'question' is required and is a string",
        },
        options: {
          bsonType: "array",
          description: "'options' is required and is an array of strings",
          items: {
            bsonType: "string",
          },
        },
        answer: {
          bsonType: "string",
          description: "'answer' is required and is a string",
        },
      },
    },
  };

  const userCollectionExists = await db.listCollections({ name: "user" }).hasNext();
  if (!userCollectionExists) {
      await db.createCollection("user", { validator: userSchema });
  }

  const moduleCollectionExists = await db.listCollections({ name: "module" }).hasNext();
  if (!moduleCollectionExists) {
      await db.createCollection("module", { validator: moduleSchema });
  }

  const videoCollectionExists = await db.listCollections({ name: "video" }).hasNext();
  if (!videoCollectionExists) {
      await db.createCollection("video", { validator: videoSchema });
  }

  const questionoptionsanswerCollectionExists = await db.listCollections({ name: "questionoptionsanswer" }).hasNext();
  if (!questionoptionsanswerCollectionExists) {
      await db.createCollection("questionoptionsanswer", { validator: questionoptionsanswerSchema });
  }
}
