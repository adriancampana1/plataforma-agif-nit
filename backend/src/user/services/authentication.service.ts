import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user";
import UserResponse from "../models/user.response";
require('dotenv').config();


class AuthenticationService {

  private static refreshTokenLife = '7d';
  private static accessTokenLife = '1m';

  static async generateTokens(user: User) {
    const payload = Object.assign({}, UserResponse.fromUser(user));
    
    const accessToken = Jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: AuthenticationService.accessTokenLife });
    
    const refreshToken = Jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!,
      { expiresIn: AuthenticationService.refreshTokenLife });

    return { accessToken, refreshToken };
  }


  static async encryptPassword(user: User) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(user.password, salt);    
  }

  static async validatePassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }

}

export default AuthenticationService;