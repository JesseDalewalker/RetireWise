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
        res.status(404).send(`Failed to find video ${id}`);
    }
} catch (error) {
    res.status(404).send(`Failed to find video ${req?.params?.id}`);
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

      if (result && result.matchedCount) {
          res.status(200).send(`Updated video ${id}.`);
      } else if (!result.matchedCount) {
          res.status(404).send(`Failed to find video ${id}`);
      } else {
          res.status(304).send(`Failed to update video ${id}`);
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

      if (result && result.deletedCount) {
          res.status(202).send(`Removed video ${id}`);
      } else if (!result) {
          res.status(400).send(`Failed to remove video ${id}`);
      } else if (!result.deletedCount) {
          res.status(404).send(`Failed to find video ${id}`);
      }
  } catch (error) {
      console.error(error.message);
      res.status(400).send(error.message);
  }
});