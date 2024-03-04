import * as express from "express";
import { collections } from "./database";

export const userRouter = express.Router();
userRouter.use(express.json());

userRouter.get("/", async (_req, res) => {
  try {
    const user = await collections.user.find({}).toArray();
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
