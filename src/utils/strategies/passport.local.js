import { Strategy } from "passport-local";
import bcrypt from "bcryptjs";
import service from "../../modules/auth/auth.service.js";

const Service = new service();

const localStrategy = new Strategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    try {
      const user = await Service.getUserByEmail(email);
      if (!user) {
        return done(null, false, { message: "Usuario o contraseña inválidos" });
      }
      const compare = await bcrypt.compare(password, user.password);
      if (!compare) {
        return done(null, false, { message: "Usuario o contraseña inválidos" });
      }
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }
);

export default localStrategy;
