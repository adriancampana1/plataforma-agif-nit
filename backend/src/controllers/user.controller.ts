import { Request, Response } from 'express';
import User from '../models/user/user';
import { validateRequest } from '../utils/requireFields';
import { userService } from '../services/user.service';
import AuthenticationService from '../services/authentication.service';

class UserController {

  private userService: userService;

  constructor(userService: userService) {
    this.userService = userService;
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async registerUser(req: Request, res: Response) {
    validateRequest(['username', 'email', 'password'])(req, res, () => { });
    const user: User = req.body;
    
    if (await userService.getUserByEmail(user.email)) {
      res.status(400).json({ message: 'Email already in use.' });
      return;
    }

    user.password = await AuthenticationService.encryptPassword(user)
    console.log(user);
    const created = await this.userService.createUser(user);
    res.status(created.statusCode).json(created);
  }

  async loginUser(req: Request, res: Response) {
    validateRequest(['email', 'password'])(req, res, () => { });
    const { email, password } = req.body;
    const loggedIn = await this.userService.loginUser(email, password);
    res.status(loggedIn.statusCode).json(loggedIn);  
  }


}

export { UserController };
