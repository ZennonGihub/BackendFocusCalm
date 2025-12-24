import boom from "@hapi/boom";
import { prisma } from "../../db/prisma.js";

class TasksServices {
  constructor() {}

  async create(data) {
    if (!data) throw boom.badRequest("No se ingreso la informacion");
    const { title, userId, estimated_pomodoros } = data;

    const newTask = await prisma.task.create({
      data: {
        title,
        estimatedPomodoros: estimated_pomodoros,
        userId: userId,
        completed: false,
        status: {
          connect: { name: "pendiente" },
        },
      },
    });
    return newTask;
  }

  async find() {
    const tasks = await prisma.task.findMany({
      include: {
        status: true,
        sessions: {
          where: { completed: true },
        },
      },
      orderBy: { id: "desc" },
    });
    return tasks;
  }

  async activateTask(userId, taskId) {
    const pendingStatus = await prisma.status.findUnique({
      where: { name: "pendiente" },
    });
    const progressStatus = await prisma.status.findUnique({
      where: { name: "en progreso" },
    });

    if (!pendingStatus || !progressStatus) {
      throw boom.internal("Error de configuración de estados");
    }

    await prisma.task.updateMany({
      where: {
        userId: Number(userId),
        statusId: progressStatus.id,
      },
      data: {
        statusId: pendingStatus.id,
      },
    });

    const activeTask = await prisma.task.update({
      where: {
        id: Number(taskId),
        userId: Number(userId),
      },
      data: {
        status: {
          connect: { name: "en progreso" },
        },
      },
    });

    return activeTask;
  }

  async findTaskProgress(userId) {
    const task = await prisma.task.findFirst({
      where: {
        userId: Number(userId),
        status: { name: "en progreso" },
      },
      select: {
        title: true,
        estimatedPomodoros: true,
        pomodoroSessions: {
          select: { completed: true },
        },
      },
    });

    if (!task) return null;

    return {
      title: task.title,
      completed: task.pomodoroSessions.length,
      estimatedPomodoros: task.estimatedPomodoros || 1,
    };
  }

  async findOne(id) {
    const task = await prisma.task.findUnique({
      where: { id: Number(id) },
      include: { status: true },
    });
    if (!task) {
      throw boom.notFound("Tarea no encontrada");
    }
    return task;
  }

  async update(id, data) {
    if (!id || !data) throw boom.badData("No se ingreso la informacion");

    const updateData = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.body !== undefined) updateData.body = data.body;
    if (data.estimated_pomodoros !== undefined)
      updateData.estimatedPomodoros = data.estimated_pomodoros;
    if (data.completed !== undefined) updateData.completed = data.completed;

    const rta = await prisma.task.update({
      where: { id: Number(id) },
      data: updateData,
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
