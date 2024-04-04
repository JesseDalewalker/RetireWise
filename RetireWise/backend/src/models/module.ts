import * as mongodb from "mongodb";

export interface Module {
    _id?: mongodb.ObjectId;
    name: string;
    moduleNumber: number;
}