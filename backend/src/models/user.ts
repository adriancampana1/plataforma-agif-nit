import { ObjectId } from "mongodb";

export default class User {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public _id?: ObjectId
  ) {}

  
    
}