import Service from "./auth.service.js";
import boom from "@hapi/boom";

const service = new Service();

export const register = async (req, res, next) => {
  try {
    const body = req.body;
    const { userObject, token, refreshToken } = await service.register(body);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      //secure: true,
      maxAge: 15 * 60 * 1000,
    });
    res.status(201).json({ token, refreshToken, user: userObject });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      throw boom.badRequest("Credenciales incorrectas");
    }
    const { token, refreshToken } = await service.login(user);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      //secure: true,
      maxAge: 15 * 60 * 1000,
    });
    res.status(200).json({ token, refreshToken });
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const newTokens = await service.refresh(refreshToken);
    res.status(200).json(newTokens);
  } catch (error) {
    next(error);
  }
};
export const profile = async (req, res, next) => {
  try {
    const user = req.user;
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};
