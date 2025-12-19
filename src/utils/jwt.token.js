import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function createAccesToken(user) {
  const payload = {
    id: user.id,
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH, {
    expiresIn: "1d",
  });

  return { token: token, refreshToken: refreshToken };
}

export async function refreshRoken(token) {
  const payload = jwt.verify(token, process.env.JWT_REFRESH);
  const newToken = jwt.sign({ id: payload.id }, process.env.SECRET_KEY, {
    expiresIn: "15m",
  });
  return newToken;
}
