import passport from "passport";
import localStrategy from "./strategies/passport.local.js";
import jwtStrategy from "./strategies/passport.jwt.js";

passport.use(localStrategy);
passport.use(jwtStrategy);

export default passport;
