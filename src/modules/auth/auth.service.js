import boom from "@hapi/boom";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createAccesToken } from "../../utils/jwt.token.js";
import { prisma } from "../../db/prisma.js";

class AuthServices {
  constructor() {}
  async register(body) {
    const { email, username, password } = body;
    const emailFound = await prisma.auth.findUnique({
      where: { email: email },
    });
    if (emailFound !== null) {
      throw boom.conflict("El email ya esta registrado");
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const userReturn = await prisma.user.create({
      data: {
        username: username,
        role: {
          connectOrCreate: {
            where: { name: "free" },
            create: { name: "free" },
          },
        },
        auth: {
          create: {
            email: email,
            password: passwordHash,
          },
        },
      },
      include: {
        role: true,
        auth: true,
      },
    });
    const { token, refreshToken } = await createAccesToken({
      id: userReturn.id,
      role: userReturn.role.name,
    });
    const userObject = {
      id: userReturn.id,
      username: userReturn.username,
      role: userReturn.role.name,
      email: userReturn.auth.email,
      createdAt: userReturn.createdAt,
    };
    return { userObject, token, refreshToken };
  }

  async login(user) {
    const { email } = user;
    const auth = await prisma.auth.findUnique({
      where: { email: email },
      include: {
        user: {
          include: {
            role: true,
          },
        },
      },
    });
    const { token, refreshToken } = await createAccesToken({
      id: auth.id,
      role: auth.user.role.name,
      username: auth.user.username,
    });
    return { token, refreshToken };
  }

  async getUserByEmail(email) {
    try {
      const authRecord = await prisma.auth.findUnique({
        where: { email: email },
        include: { user: true },
      });
      if (!authRecord) {
        throw boom.notFound("Usuario no encontrado");
      }
      return authRecord;
    } catch (error) {
      throw boom.internal("Error al obtener el usuario por email");
    }
  }

  async findOne(id) {
    try {
      const authRecord = await prisma.auth.findUnique({
        where: { id: Number(id) },
        include: { user: true },
      });
      if (!authRecord) {
        throw boom.notFound("Usuario no encontrado");
      }
      return authRecord;
    } catch (error) {
      throw boom.notFound("Error al obtener el usuario");
    }
  }

  async refresh(refreshToken) {
    try {
      const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH);
      const user = {
        id: payload.id,
        role: payload.role,
      };
      const newTokens = await createAccesToken(user);
      return {
        token: newTokens.token,
        refreshToken: newTokens.refreshToken,
      };
    } catch (error) {
      throw boom.unauthorized("Token de refresco inválido o expirado.");
    }
  }
}

export default AuthServices;
