import { Request, Response } from 'express';
import { collections } from '../services/database.service';
// import { UserRepository } from '../repositories/user.repository';

class UserController {

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await collections.users?.find()?.toArray();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      console.log(req.body);
      res.status(200).json({ message: 'user created', user: req.body });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}

export { UserController };
