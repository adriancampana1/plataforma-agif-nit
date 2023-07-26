import { collections } from "../../database/database.service";

export default class Address {
  constructor(
    public zip_code: string,
    public number: number,
    public complement: string,
    public street?: string,
    public district?: string,
    public city?: string,
    public created_at?: Date,
    public updated_at?: Date,
  ) { }

  async createAddress() {
    try {
      this.created_at = new Date();
      this.updated_at = new Date();
      console.log(this);
      return await collections.addresses?.insertOne(this);
    } catch (error: any) {
      throw new Error(error);
    }
  }

}