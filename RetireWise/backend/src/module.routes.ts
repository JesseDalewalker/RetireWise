import * as express from "express";
import { collections } from "./database";

export const moduleRouter = express.Router();
moduleRouter.use(express.json());

moduleRouter.get("/", async (_req, res) => {
  try {
    const module = await collections.module.find({}).toArray();
    res.status(200).send(module);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
