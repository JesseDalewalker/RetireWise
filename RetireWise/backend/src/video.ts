import * as mongodb from "mongodb";

export interface Video {
    _id?: mongodb.ObjectId;
    moduleID: number;
    videoAndQuizPageID: number;
    videoID: string;
}