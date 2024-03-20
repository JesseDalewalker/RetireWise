import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";


export const expenseRouter = express.Router();
expenseRouter.use(express.json());

//GET ALL expense
expenseRouter.get("/", async (_req, res) => {
    try {
        const expense = await collections.expense.find({}).toArray();
        res.status(200).send(expense);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//POST (CREATE) ONE NEW expense
expenseRouter.post("/", async (req, res) => {
    try {
        const expense = req.body;

        const result = await collections.expense.insertOne(expense);

        if (result.acknowledged) {
            res.status(201).json({ status: 201, message: "expense created successfully." });
        } else {
            res.status(500).json({ status: 500, message: "Failed to create a new expense." });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});