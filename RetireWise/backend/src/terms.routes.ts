import * as express from "express";
import { collections } from "./database";

export const termRouter = express.Router();
termRouter.use(express.json());

termRouter.get("/", async (_req, res) => {
  try {
    const term = await collections.term.find({}).toArray();
    res.status(200).send(term);
  } catch (error) {
    res.status(500).send(error.message);
  }
});