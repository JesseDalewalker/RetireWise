import * as mongodb from "mongodb";

export interface QuestionOptionsAnswer {
    _id?: mongodb.ObjectId;
    moduleID: number;
    videoAndQuizPageID: number;
    question: string;
    options: string[];
    answer: string;
}