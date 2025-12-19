import dotenv from "dotenv";
dotenv.config();
import { Strategy, ExtractJwt } from "passport-jwt";
import service from "../../modules/auth/auth.service.js";

const controller = new service();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
};
const jwtStrategy = new Strategy(options, async (payload, done) => {
  try {
    const user = await controller.findOne(payload.id);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (err) {
    done(err, false);
  }
});
export default jwtStrategy;
