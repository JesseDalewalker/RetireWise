import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";


export const expenseRouter = express.Router();
expenseRouter.use(express.json());

//GET ALL videos
expenseRouter.get("/", async (_req, res) => {
    try {
        const expense = await collections.expense.find({}).toArray();
        res.status(200).send(expense);
    } catch (error) {
        res.status(500).send(error.message);
    }
});