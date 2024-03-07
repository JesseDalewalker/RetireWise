import * as mongodb from "mongodb";

export interface Term {
    _id?: mongodb.ObjectId;
    wordName: string;
    definitionID: string;
    isFlipped: boolean;
    state: string;
}