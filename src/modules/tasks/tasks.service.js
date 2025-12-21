import boom from "@hapi/boom";
import { prisma } from "../../db/prisma.js";

class TasksServices {
  constructor() {}
  async create(data) {
    if (data === undefined) {
      throw boom.badRequest("No se ingreso la informacion");
    }
    const { title, userId, estimated_pomodoros } = data;
    const newTask = await prisma.task.create({
      data: {
        title,
        estimatedPomodoros: estimated_pomodoros,
        userId: userId,
      },
    });
    return newTask;
  }

  async find() {
    const tasks = await prisma.task.findMany({
      include: {
        status: true,
      },
    });
    return tasks;
  }

  async findOne(id) {
    const task = await prisma.task.findUnique({
      where: { id: Number(id) },
      include: {
        status: true,
      },
    });
    if (!task) {
      throw boom.notFound("Tarea no encontrada");
    }
    return task;
  }

  async update(id, data) {
    const { title, body, estimated_pomodoros } = data;
    console.log("DATA en el service de update: ", data);
    if (!id || !data) {
      throw boom.badData("No se ingreso la informacion");
    }
    const rta = await prisma.task.update({
      where: { id: Number(id) },
      data: {
        title,
        body,
        estimatedPomodoros: estimated_pomodoros,
      },
    });
    return rta;
  }

  async delete(id) {
    await this.findOne(id);
    await prisma.task.delete({
      where: { id: Number(id) },
    });
    return { id };
  }
}

export default TasksServices;
