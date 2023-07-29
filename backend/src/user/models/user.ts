import { ObjectId } from 'mongodb';
import { collections } from '../../database/database.service';

// role: 'student' | 'teacher' | 'admin'

export default class User {
  constructor(
    public username: string,
    public email: string,
    public password: string,
    public address_id?: ObjectId,
    public role: string = 'student',
    public created_at?: Date,
    public updated_at?: Date,
    public _id?: ObjectId
  ) { }

  async createUser() {
    try {
      this.created_at = new Date();
      this.updated_at = new Date();
      return await collections.users?.insertOne(this);
    } catch (error: any) {
      throw error;
    }
  }

  async deleteUser() {
    try {
      return await collections.users?.deleteOne({ _id: this._id });
    } catch (error: any) {
      throw error;
    }
  }

  static async getAllUsers(): Promise<User[]> {
    try {
      return await collections.users?.find()?.toArray() as User[];
    } catch (error: any) {
      console.error(error);
      throw new Error('An error occurred while retrieving the users.');
    }
  }

}