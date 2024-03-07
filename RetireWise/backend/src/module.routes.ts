import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";

export const moduleRouter = express.Router();
moduleRouter.use(express.json());

//GET ALL modules
moduleRouter.get("/", async (_req, res) => {
  try {
    const module = await collections.module.find({}).toArray();
    res.status(200).send(module);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//GET ONE module BY ID
moduleRouter.get("/:id", async (req, res) => {
try {
    const id = req?.params?.id;
    const query = { _id: new mongodb.ObjectId(id) };
    const module = await collections.module.findOne(query);
    if (module) {
        res.status(200).send(module);
    } else {
        res.status(404).send(`Failed to find module ${id}`);
    }
} catch (error) {
    res.status(404).send(`Failed to find module ${req?.params?.id}`);
}
});

//POST (CREATE) ONE module
moduleRouter.post("/", async (req, res) => {
try {
    const module = req.body;
    const result = await collections.module.insertOne(module);

    if (result.acknowledged) {
        res.status(201).send(`Created new module ${result.insertedId}.`);
    } else {
        res.status(500).send("Failed to create a new module.");
    }
} catch (error) {
    console.error(error);
    res.status(400).send(error.message);
}
});

//PUT (UPDATE) ONE module BY ID
moduleRouter.put("/:id", async (req, res) => {
  try {
      const id = req?.params?.id;
      const module = req.body;
      const query = { _id: new mongodb.ObjectId(id) };
      const result = await collections.module.updateOne(query, { $set: module });

      if (result && result.matchedCount) {
          res.status(200).send(`Updated module ${id}.`);
      } else if (!result.matchedCount) {
          res.status(404).send(`Failed to find module ${id}`);
      } else {
          res.status(304).send(`Failed to update module ${id}`);
      }
  } catch (error) {
      console.error(error.message);
      res.status(400).send(error.message);
  }
});

//DELETE ONE module
moduleRouter.delete("/:id", async (req, res) => {
  try {
      const id = req?.params?.id;
      const query = { _id: new mongodb.ObjectId(id) };
      const result = await collections.module.deleteOne(query);

      if (result && result.deletedCount) {
          res.status(202).send(`Removed module ${id}`);
      } else if (!result) {
          res.status(400).send(`Failed to remove module ${id}`);
      } else if (!result.deletedCount) {
          res.status(404).send(`Failed to find module ${id}`);
      }
  } catch (error) {
      console.error(error.message);
      res.status(400).send(error.message);
  }
});