import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "../database";
import mongoSanitize from "express-mongo-sanitize";

export const videoRouter = express.Router();
videoRouter.use(express.json());
videoRouter.use(mongoSanitize());

//GET ALL videos
videoRouter.get("/", async (_req, res) => {
  try {
    const video = await collections.video.find({}).toArray();
    res.status(200).send(video);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//GET ONE video BY ID
videoRouter.get("/:id", async (req, res) => {
try {
    const id = req?.params?.id;
    const query = { _id: new mongodb.ObjectId(id) };
    const video = await collections.video.findOne(query);
    if (video) {
        res.status(200).send(video);
    } else {
        res.sendStatus(404);
    }
} catch (error) {
    res.sendStatus(404);
}
});

//POST (CREATE) ONE video
videoRouter.post("/", async (req, res) => {
try {
    const video = req.body;
    const result = await collections.video.insertOne(video);

    if (result.acknowledged) {
        res.status(201).send(`Created new video ${result.insertedId}.`);
    } else {
        res.status(500).send("Failed to create a new video.");
    }
} catch (error) {
    console.error(error);
    res.status(400).send(error.message);
}
});

//PUT (UPDATE) ONE video BY ID
videoRouter.put("/:id", async (req, res) => {
  try {
      const id = req?.params?.id;

      if (!mongodb.ObjectId.isValid(id)) {
        res.status(400).send(`Invalid module ID`);
        return;
      }

      const video = req.body;
      const query = { _id: new mongodb.ObjectId(id) };
      const result = await collections.video.updateOne(query, { $set: video });

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

//DELETE ONE video
videoRouter.delete("/:id", async (req, res) => {
  try {
      const id = req?.params?.id;

      if (!mongodb.ObjectId.isValid(id)) {
        res.status(400).send(`Invalid module ID`);
        return;
      }
      
      const query = { _id: new mongodb.ObjectId(id) };
      const result = await collections.video.deleteOne(query);

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