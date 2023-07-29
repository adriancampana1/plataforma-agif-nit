import { collections } from "../../database/database.service";

export default class Course {

  constructor(
    public title: string,
    public description: string,
    public tags: string[],
    public progress: number,
    public created_at?: Date,
    public updated_at?: Date
  ){}

  async createCourse() {
    try {
      this.created_at = new Date();
      this.updated_at = new Date();
      console.log(this);
      return await collections.courses?.insertOne(this);
    } catch (error: any) {
      console.log(error);
      throw error;
    }
  }

}
