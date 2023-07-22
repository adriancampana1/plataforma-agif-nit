import { Request, Response } from 'express';
import { UserService } from '../../user/services/user.service';
import { validateRequest } from '../../utils/requireFields';
import User from '../models/user';

class UserController {

  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.getAllUsers();
      res.status(users.statusCode).json(users);
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while retrieving the users.' });
    }
  }

  async registerUser(req: Request, res: Response) {
    try {
      validateRequest(['username', 'email', 'password'])(req, res, () => { });
      const user = new User(req.body.username, req.body.email, req.body.password);

      const response = await this.userService.registerUser(user)
      res.status(response.statusCode).json(response);
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while registering the user.' });
    }
  }

  async loginUser(req: Request, res: Response) {
    validateRequest(['email', 'password'])(req, res, () => { });
    const { email, password } = req.body;
    const loggedIn = await this.userService.loginUser(email, password);
    res.status(loggedIn.statusCode).json(loggedIn);
  }


}

export { UserController };
