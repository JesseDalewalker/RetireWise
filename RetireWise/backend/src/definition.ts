import * as mongodb from "mongodb";

export interface Definition {
    _id?: mongodb.ObjectId;
    definition: string;
    isFlipped: boolean;
    state: string;
}