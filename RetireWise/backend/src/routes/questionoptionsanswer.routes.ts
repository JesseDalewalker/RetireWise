import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "../database";

export const questionoptionsanswerRouter = express.Router();
questionoptionsanswerRouter.use(express.json());

//GET ALL questionoptionsanswers
questionoptionsanswerRouter.get("/", async (_req, res) => {
  try {
    const questionoptionsanswer = await collections.questionoptionsanswer.find({}).toArray();
    res.status(200).send(questionoptionsanswer);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//GET ONE questionoptionsanswer BY ID
questionoptionsanswerRouter.get("/:id", async (req, res) => {
try {
    const id = req?.params?.id;
    const query = { _id: new mongodb.ObjectId(id) };
    const questionoptionsanswer = await collections.questionoptionsanswer.findOne(query);
    if (questionoptionsanswer) {
        res.status(200).send(questionoptionsanswer);
    } else {
        res.status(404).send(`Failed to find questionoptionsanswer ${id}`);
    }
} catch (error) {
    res.status(404).send(`Failed to find questionoptionsanswer ${req?.params?.id}`);
}
});

//POST (CREATE) ONE questionoptionsanswer
questionoptionsanswerRouter.post("/", async (req, res) => {
try {
    const questionoptionsanswer = req.body;
    const result = await collections.questionoptionsanswer.insertOne(questionoptionsanswer);

    if (result.acknowledged) {
        res.status(201).send(`Created new questionoptionsanswer ${result.insertedId}.`);
    } else {
        res.status(500).send("Failed to create a new questionoptionsanswer.");
    }
} catch (error) {
    console.error(error);
    res.status(400).send(error.message);
}
});

//PUT (UPDATE) ONE questionoptionsanswer BY ID
questionoptionsanswerRouter.put("/:id", async (req, res) => {
  try {
      const id = req?.params?.id;
      const questionoptionsanswer = req.body;
      const query = { _id: new mongodb.ObjectId(id) };
      const result = await collections.questionoptionsanswer.updateOne(query, { $set: questionoptionsanswer });

      if (result && result.matchedCount) {
          res.status(200).send(`Updated questionoptionsanswer ${id}.`);
      } else if (!result.matchedCount) {
          res.status(404).send(`Failed to find questionoptionsanswer ${id}`);
      } else {
          res.status(304).send(`Failed to update questionoptionsanswer ${id}`);
      }
  } catch (error) {
      console.error(error.message);
      res.status(400).send(error.message);
  }
});

//DELETE ONE questionoptionsanswer
questionoptionsanswerRouter.delete("/:id", async (req, res) => {
  try {
      const id = req?.params?.id;
      const query = { _id: new mongodb.ObjectId(id) };
      const result = await collections.questionoptionsanswer.deleteOne(query);

      if (result && result.deletedCount) {
          res.status(202).send(`Removed questionoptionsanswer ${id}`);
      } else if (!result) {
          res.status(400).send(`Failed to remove questionoptionsanswer ${id}`);
      } else if (!result.deletedCount) {
          res.status(404).send(`Failed to find questionoptionsanswer ${id}`);
      }
  } catch (error) {
      console.error(error.message);
      res.status(400).send(error.message);
  }
});