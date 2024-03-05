import * as mongodb from "mongodb";
import { User } from "./user";
import { Module } from "./module";
import { Term } from "./term";
import { Definition } from "./definition";

//Export all the collections here
export const collections: {
  module?: mongodb.Collection<Module>;
  user?: mongodb.Collection<User>;
  term?: mongodb.Collection<Term>;
  definition?: mongodb.Collection<Definition>;
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

  const termCollection = db.collection<Term>("terms");
  collections.term = termCollection;

  const definitionCollection = db.collection<Definition>("definitions");
  collections.definition = definitionCollection;
}

//TODO - Figure out the applySchemaValidation for each model/schema (e.g., module, videos, etc)

// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our Employee model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applySchemaValidation(db: mongodb.Db) {
  const jsonSchema = {
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
          description: "'password' is required and is a string",
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
          bsonType: "string",
          description: "'moduleNumber' is required and is a string",
          minLength: 5,
        },
      },
    },
  };

  const termSchema = {
    $jsonSchema: {
      bsonType: "object",
      required: ["definitionID", "isFlipped", "state", "wordName"],
      additionalProperties: false,
      properties: {
        _id: {},
        definitionID: {
          bsonType: "string",
          description: "'definitionID' is required and is a string",
          minLength: 5,
        },
        isFlipped: {
          bsonType: "boolean",
          description: "'isFlipped' is required and is a boolean",
        },
        state: {
          bsonType: "string",
          description: "'state' is required and is a string",
        },
        wordName: {
          bsonType: "string",
          description: "'wordName' is required and is a string",
        },

      },
    },
  };

  const definitionSchema = {
    $jsonSchema: {
      bsonType: "object",
      required: ["definition", "isFlipped", "state"],
      additionalProperties: false,
      properties: {
        _id: {},
        definition: {
          bsonType: "string",
          description: "'definitionID' is required and is a string",
          minLength: 5,
        },
        isFlipped: {
          bsonType: "boolean",
          description: "'isFlipped' is required and is a boolean",
        },
        state: {
          bsonType: "string",
          description: "'state' is required and is a string",
        },
      },
    },
  };


}
