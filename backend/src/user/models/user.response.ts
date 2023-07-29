import User from "./user";

class UserResponse {
  username: string;
  email: string;
  role: string;
  accessToken?: string;
  refreshToken?: string;

  constructor(username: string, email: string, role: string) {
    this.username = username;
    this.email = email;
    this.role = role;
  }

  static fromUser(user: User) {
    return new UserResponse(user.username, user.email, user.role);
  }
}

export default UserResponse;