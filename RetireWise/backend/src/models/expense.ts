import * as mongodb from "mongodb";

export interface Expense {
    _id?: mongodb.ObjectId;
    expense: string;
    category: string;
    date: string;
    amount: number;
    user: string;
}