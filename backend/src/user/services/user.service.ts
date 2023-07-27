import { ServiceResponse } from "../../utils/types/service.response";
import User from "../models/user";
import UserResponse from "../models/user.response";
import AuthenticationService from "./authentication.service";
import { collections } from "../../database/database.service";
import { DeleteResult } from "mongodb";

class UserService {

  async getAllUsers(): Promise<ServiceResponse<UserResponse[]>> {
    try {
      const users = await User.getAllUsers();
      return {
        statusCode: 200,
        message: 'Users retrieved successfully.',
        data: users?.map(user => UserResponse.fromUser(user))
      };
    } catch (error: any) {
      console.error(error);
      return {
        statusCode: 500,
        message: 'An error occurred while retrieving the users.',
      }
    }
  }

  async registerUser(user: User): Promise<ServiceResponse<UserResponse>> {
    try {
      if (await UserService.getUserByEmail(user.email)) {
        return {
          statusCode: 400,
          message: 'Email already in use.'
        }
      }

      user.password = await AuthenticationService.encryptPassword(user)

      await user.createUser();

      return {
        statusCode: 201,
        message: 'User created successfully.',
        data: UserResponse.fromUser(user)
      }
    } catch (error: any) {
      console.error(error.errInfo.details);
      return {
        statusCode: 500,
        message: 'An error occurred while registering the user.',
      }
    }
  }

  async loginUser(email: string, password: string): Promise<ServiceResponse<UserResponse>> {
    try {
      const user = await UserService.getUserByEmail(email) as User;
      if (!user) {
        return {
          statusCode: 401,
          message: 'User not found'
        }
      }

      const validPassword = await AuthenticationService.validatePassword(password, user.password);

      if (!validPassword) {
        return {
          statusCode: 401,
          message: 'Invalid password'
        }
      }

      const token = await AuthenticationService.generateTokens(user);
      const userResponse = UserResponse.fromUser(user);
      userResponse.accessToken = token.accessToken;
      userResponse.refreshToken = token.refreshToken;

      return {
        statusCode: 200,
        message: 'User logged in successfully.',
        data: userResponse
      }

    } catch (error: any) {
      console.error(error);
      return {
        statusCode: 500,
        message: 'An error occurred while logging in the user.',
      }
    }
  }

  async deleteUser(user: User): Promise<ServiceResponse<DeleteResult | undefined>> {
    try {
      const deletedUser = await user.deleteUser();
      return {
        statusCode: 200,
        message: 'User deleted successfully.',
        data: deletedUser
      }
    } catch (error: any) {
      console.error(error);
      return {
        statusCode: 500,
        message: 'An error occurred while deleting the user.',
      }
    }
  }

  // Utils functions
  static async getUserByEmail(email: string) {
    return collections.users?.findOne({ email });
  }

}

export { UserService }