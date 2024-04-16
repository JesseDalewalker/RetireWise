import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "../database";
import mongoSanitize from "express-mongo-sanitize";

export const quizRouter = express.Router();
quizRouter.use(express.json());
quizRouter.use(mongoSanitize());

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
        res.sendStatus(404);
    }
} catch (error) {
    res.sendStatus(404);
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

      if (!mongodb.ObjectId.isValid(id)) {
        res.status(400).send(`Invalid module ID`);
        return;
      }

      const quiz = req.body;
      const query = { _id: new mongodb.ObjectId(id) };
      const result = await collections.quiz.updateOne(query, { $set: quiz });

      if (result?.matchedCount) {
          res.sendStatus(200);
      } else if (!result.matchedCount) {
          res.sendStatus(404);
      } else {
          res.sendStatus(304);
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

      if (!mongodb.ObjectId.isValid(id)) {
        res.status(400).send(`Invalid module ID`);
        return;
      }
      
      const query = { _id: new mongodb.ObjectId(id) };
      const result = await collections.quiz.deleteOne(query);

      if (result?.deletedCount) {
          res.sendStatus(202);
      } else if (!result) {
          res.sendStatus(400);
      } else if (!result.deletedCount) {
          res.sendStatus(404);
      }
  } catch (error) {
      console.error(error.message);
      res.status(400).send(error.message);
  }
});