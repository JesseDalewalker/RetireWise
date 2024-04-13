import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "../database";
import mongoSanitize from "express-mongo-sanitize";

export const moduleRouter = express.Router();
moduleRouter.use(express.json());
moduleRouter.use(mongoSanitize());

//GET ALL modules
moduleRouter.get("/", async (_req, res) => {
  try {
    const module = await collections.module.find({}).toArray();
    res.sendStatus(200).send(module);
  } catch (error) {
    res.sendStatus(500).send(error.message);
  }
});

//GET ONE module BY ID
moduleRouter.get("/:id", async (req, res) => {
try {
    const id = req?.params?.id;

    if (!mongodb.ObjectId.isValid(id)) {
        res.sendStatus(400).send(`Invalid module ID`);
        return;
    }

    const query = { _id: new mongodb.ObjectId(id) };
    const module = await collections.module.findOne(query);
    if (module) {
        res.sendStatus(200).send(module);
    } else {
        res.sendStatus(404)
    }
} catch (error) {
    res.sendStatus(404)
}
});

//POST (CREATE) ONE module
moduleRouter.post("/", async (req, res) => {
try {
    const module = req.body;
    const result = await collections.module.insertOne(module);

    if (result.acknowledged) {
        res.sendStatus(201).send(`Created new module ${result.insertedId}.`);
    } else {
        res.sendStatus(500).send("Failed to create a new module.");
    }
} catch (error) {
    console.error(error);
    res.sendStatus(400).send(error.message);
}
});

//PUT (UPDATE) ONE module BY ID
moduleRouter.put("/:id", async (req, res) => {
  try {
      const id = req?.params?.id;

      if (!mongodb.ObjectId.isValid(id)) {
        res.sendStatus(400).send(`Invalid module ID`);
        return;
      }

      const module = req.body;
      const query = { _id: new mongodb.ObjectId(id) };
      const result = await collections.module.updateOne(query, { $set: module });

      if (result && result.matchedCount) {
          res.sendStatus(200)
      } else if (!result.matchedCount) {
          res.sendStatus(404)
      } else {
          res.sendStatus(304)
      }
  } catch (error) {
      console.error(error.message);
      res.sendStatus(400).send(error.message);
  }
});

//DELETE ONE module
moduleRouter.delete("/:id", async (req, res) => {
  try {
      const id = req?.params?.id;

      if (!mongodb.ObjectId.isValid(id)) {
        res.sendStatus(400).send(`Invalid module ID`);
        return;
      }

      const query = { _id: new mongodb.ObjectId(id) };
      const result = await collections.module.deleteOne(query);

      if (result && result.deletedCount) {
          res.sendStatus(202)
      } else if (!result) {
          res.sendStatus(400)
      } else if (!result.deletedCount) {
          res.sendStatus(404)
      }
  } catch (error) {
      console.error(error.message);
      res.sendStatus(400).send(error.message);
  }
});