import passport from "passport";
import passportJwt from "passport-jwt";
import { userService } from "../services/user.service";
require('dotenv').config();

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET
}

passport.use(
  new JwtStrategy(opts, async (payload, done) => {
    try {
      
      const user = userService.getUserByEmail(payload.email);
        
      if (user) {
        return done(null, user)
      }
      
      return done(null, false)
      
    } catch (error) {
      done(error, false);
    }
  })
  )
  
  