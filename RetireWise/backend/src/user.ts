import * as mongodb from "mongodb";

export interface User {
  _id?: mongodb.ObjectId;
  email: string;
  password: string;
}