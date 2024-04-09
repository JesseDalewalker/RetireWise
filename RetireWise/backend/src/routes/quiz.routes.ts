import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "../database";

export const quizRouter = express.Router();
quizRouter.use(express.json());

//GET ALL quizzes
quizRouter.get("/", async (_req, res) => {
  try {
    const quiz = await collections.quiz.find({}).toArray();
    res.status(200).send(quiz);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//GET ONE quiz BY ID
quizRouter.get("/:id", async (req, res) => {
try {
    const id = req?.params?.id;
    const query = { _id: new mongodb.ObjectId(id) };
    const quiz = await collections.quiz.findOne(query);
    if (quiz) {
        res.status(200).send(quiz);
    } else {
        res.status(404).send(`Failed to find quiz ${id}`);
    }
} catch (error) {
    res.status(404).send(`Failed to find quiz ${req?.params?.id}`);
}
});

//POST (CREATE) ONE quiz
quizRouter.post("/", async (req, res) => {
try {
    const quiz = req.body;
    const result = await collections.quiz.insertOne(quiz);

    if (result.acknowledged) {
        res.status(201).send(`Created new quiz ${result.insertedId}.`);
    } else {
        res.status(500).send("Failed to create a new quiz.");
    }
} catch (error) {
    console.error(error);
    res.status(400).send(error.message);
}
});

//PUT (UPDATE) ONE quiz BY ID
quizRouter.put("/:id", async (req, res) => {
  try {
      const id = req?.params?.id;
      const quiz = req.body;
      const query = { _id: new mongodb.ObjectId(id) };
      const result = await collections.quiz.updateOne(query, { $set: quiz });

      if (result && result.matchedCount) {
          res.status(200).send(`Updated quiz ${id}.`);
      } else if (!result.matchedCount) {
          res.status(404).send(`Failed to find quiz ${id}`);
      } else {
          res.status(304).send(`Failed to update quiz ${id}`);
      }
  } catch (error) {
      console.error(error.message);
      res.status(400).send(error.message);
  }
});

//DELETE ONE quiz
quizRouter.delete("/:id", async (req, res) => {
  try {
      const id = req?.params?.id;
      const query = { _id: new mongodb.ObjectId(id) };
      const result = await collections.quiz.deleteOne(query);

      if (result && result.deletedCount) {
          res.status(202).send(`Removed quiz ${id}`);
      } else if (!result) {
          res.status(400).send(`Failed to remove quiz ${id}`);
      } else if (!result.deletedCount) {
          res.status(404).send(`Failed to find quiz ${id}`);
      }
  } catch (error) {
      console.error(error.message);
      res.status(400).send(error.message);
  }
});