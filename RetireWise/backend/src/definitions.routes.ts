import * as express from "express";
import { collections } from "./database";

export const definitionRouter = express.Router();
definitionRouter.use(express.json());

definitionRouter.get("/", async (_req, res) => {
    try {
        const definition = await collections.definition.find({}).toArray();
        res.status(200).send(definition);
    } catch (error) {
        res.status(500).send(error.message);
    }
});