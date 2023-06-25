import User from "./user";

class UserResponse {
  username: string;
  email: string;
  accessToken?: string;
  refreshToken?: string;

  constructor(username: string, email: string) {
    this.username = username;
    this.email = email;
  }

  static fromUser(user: User) {
    return new UserResponse(user.username, user.email);
  }
}

export default UserResponse;