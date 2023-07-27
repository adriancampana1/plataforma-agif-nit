import { Request, Response } from 'express';
import { UserService } from '../../user/services/user.service';
import { validateRequest } from '../../utils/requireFields';
import User from '../models/user';
import AddressService from '../../address/services/address.service';
import Address from '../../address/models/address';
import { ObjectId } from 'mongodb';

class UserController {

  private userService: UserService;
  private addressService: AddressService;

  constructor(userService: UserService) {
    this.userService = userService;
    this.addressService = new AddressService();
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
      validateRequest(['zip_code', 'number', 'complement'])(req, res, () => { });

      const address = new Address(req.body.zip_code, req.body.number, req.body.complement);
      const addressCreated = await this.addressService.createAddress(address);

      if (addressCreated.statusCode !== 201)
        return res.status(addressCreated.statusCode).json(addressCreated);

      const user = new User(req.body.username, req.body.email, req.body.password, addressCreated.data?.insertedId);

      const userCreated = await this.userService.registerUser(user)
      return res.status(userCreated.statusCode).json(userCreated);
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

  async deleteAccount(req: Request, res: Response) {
    try {
      const { username, email, password, address_id, created_at, updated_at, _id } = req.user as User;
      const user = new User(
        username,
        email,
        password,
        address_id,
        created_at,
        updated_at,
        _id
      )
      const deletedUser = await this.userService.deleteUser(user);

      if (deletedUser.statusCode !== 200)
        return res.status(deletedUser.statusCode).json(deletedUser);

      const deletedAddress = await AddressService.deleteAddressById(user.address_id as ObjectId);
      delete deletedAddress.data;
      res.status(deletedAddress.statusCode).json(deletedAddress);
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while deleting the user.' });
    }
  }


}

export { UserController };
