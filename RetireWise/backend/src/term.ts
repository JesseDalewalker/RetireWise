import * as mongodb from "mongodb";

export interface Term {
    _id?: mongodb.ObjectId;
    wordname: string;
    definitionID: string;
    isFlipped: boolean;
    state: string;
}