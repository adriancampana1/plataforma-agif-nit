import { ServiceResponse } from "../models/service/service.response";
import User from "../models/user/user";
import UserResponse from "../models/user/user.response";
import AuthenticationService from "./authentication.service";
import { collections } from "./database.service";

class UserService {

  async createUser(user: User): Promise<ServiceResponse<UserResponse>> {
    try {
      await collections.users?.insertOne(user);
      return {
        statusCode: 201,
        message: 'User created successfully.',
        data: UserResponse.fromUser(user)
      }
    } catch (error: any) {
      console.error(error); // log the error for debugging purposes

      let errorMessage = 'An error occurred while creating the user.';
      let statusCode = 500;

      if (error?.code === 11000) {
        errorMessage = 'The username or email is already in use.';
        statusCode = 400;
      }

      return {
        statusCode,
        message: errorMessage,
      }
    }
  }

  async getAllUsers() {
    try {
      const users = await collections.users?.find()?.toArray();
      return { users };
    } catch (error: any) {
      console.error(error);
      return {
        error: {
          message: 'An error occurred while getting the users.',
          type: error.name
        }
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


  // Utils functions
  static async getUserByEmail(email: string) {
    return collections.users?.findOne({ email });
  }

}

export { UserService }