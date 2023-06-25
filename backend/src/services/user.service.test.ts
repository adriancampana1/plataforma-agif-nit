import User from "../models/user/user";
import UserResponse from "../models/user/user.response";
import { UserService } from "./user.service";

describe("User Service", () => {

  describe("createUser", () => {

    let user: User;

    beforeEach(() => {
      user = new User("john", "johndoe@gmail.com", "password");
    });

    it("should return a successful response when the user is created successfully.", async () => {

      const expectedResponse = {
        statusCode: 201,
        message: 'User created successfully.',
        data: UserResponse.fromUser(user)
      };

      jest.mock('./database.service', () => ({
        collections: {
          users: {
            insertOne: jest.fn()
          }
        }
      }));

      const userService = new UserService();
      const response = await userService.createUser(user);
      console.log('jest', response);

      expect(response).toEqual(expectedResponse);
    });
  })
});