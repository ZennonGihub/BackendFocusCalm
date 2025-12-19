import boom from "@hapi/boom";
import { prisma } from "../../db/prisma.js";

class UserServices {
  constructor() {}
  async findUsers() {
    const listaUsuarios = await prisma.user.findMany();
    return listaUsuarios;
  }

  async findOne(id) {
    const userFound = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: { auth: true },
    });
    if (!userFound) {
      throw boom.notFound("Usuario no encontrado");
    }
    return userFound;
  }
  async change(id, data) {
    const { username } = data;
    const userFound = await this.findOne(id);
    const rta = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        username,
      },
    });
    return rta;
  }
  async remove(id) {
    await this.findOne(id);
    await prisma.user.remove({ where: { id: Number(id) } });
    return rta;
  }
}

export default UserServices;
