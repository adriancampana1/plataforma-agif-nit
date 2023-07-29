import User from "../models/user"
import AuthenticationService from "./authentication.service";

describe('AuthenticationService', () => {

  let user: User;

  beforeAll(() => {
    user = new User(
      'Nathan',
      'nathandg@team.com',
      '123456'
    );
  })

  describe('generateTokens', () => {
    it('should generate access and refresh tokens', async () => {
      const tokens = await AuthenticationService.generateTokens(user);

      console.log(tokens);

      expect(tokens).toHaveProperty('accessToken');
      expect(tokens).toHaveProperty('refreshToken');
      expect(tokens.accessToken).toBeTruthy();
      expect(tokens.refreshToken).toBeTruthy();
    });
  });

  describe('encryptPassword', () => {
    it('should encrypt the password', async () => {
      const hashedPassword = await AuthenticationService.encryptPassword(user);
      expect(hashedPassword).toBeTruthy();
      expect(hashedPassword).not.toBe(user.password);
    });

    it('should verify the password', async () => {
      const hashedPassword = await AuthenticationService.encryptPassword(user);
      const isValid = await AuthenticationService.validatePassword(user.password, hashedPassword);

      expect(isValid).toBeTruthy();
    });

    it('should return false if the password is invalid', async () => {
      const hashedPassword = await AuthenticationService.encryptPassword(user);
      const isValid = await AuthenticationService.validatePassword('1234567', hashedPassword);

      expect(isValid).toBeFalsy();
    });
  })
});