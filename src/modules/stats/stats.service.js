import boom from "@hapi/boom";
import { prisma } from "../../db/prisma.js";

class StastService {
  async streak(userId) {
    // Obtengo todos las sesiones COMPLETADAS del usuario
    const sessions = await prisma.pomodoroSession.findMany({
      where: { userId: Number(userId), completed: true },
      select: { startTime: true },
      orderBy: { startTime: "desc" },
    });

    const daysStreak = new Set();
    // Llenamos el set con fecha no duplicadas
    sessions.forEach((session) => {
      const date = new Date(session.startTime);
      daysStreak.add(date.toDateString());
    });

    // Calculamos la racha
    let counter = new Date();
    let streak = 0;

    // Calculamos el dia anterior para evitar problemas
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (
      !daysStreak.has(counter.toDateString()) &&
      !daysStreak.has(yesterday.toDateString())
    ) {
      return 0;
    }

    // Contamos los dias desde ayer, si es que hoy todabia no ah trabajado
    if (!daysStreak.has(counter.toDateString())) {
      counter.setDate(counter.getDate() - 1);
    }

    // Recorremos el set hacia atras para poder generar nuestra racha
    while (daysStreak.has(counter.toDateString())) {
      streak += 1;
      counter.setDate(counter.getDate() - 1);
    }
    return streak;
  }

  // Calculo de "tasa de exito" de los pomodoros
  async successRate(userId) {
    // Obtengo todos las sesiones del usuario
    const sessions = await prisma.pomodoroSession.findMany({
      where: { userId: Number(userId) },
      select: { completed: true },
    });

    // Return de 0 si no hay sesiones
    if (sessions.length === 0) return 0;

    // Calculo de la tasa de exito
    const totalSessions = sessions.length;
    const successfulSessions = sessions.filter((session) => session.completed);
    const tasaExito = (successfulSessions.length / totalSessions) * 100;

    // Se redondea y retorna
    return Math.round(tasaExito);
  }

  async createSession(userId, taskId, body) {
    const { durationMinutes, date, type } = body;
    const endTime = new Date(date);
    const startTime = new Date(endTime.getTime() - durationMinutes);
    console.log(startTime, endTime, durationMinutes, type);
    const newSession = await prisma.pomodoroSession.create({
      data: {
        userId: userId,
        startTime: startTime,
        endTime: endTime,
        durationMinutes: durationMinutes,
        completed: true,
        type: type,
        taskId: Number(taskId),
      },
    });
    return newSession;
  }

  // Calcular el promedio de focus del usuario
  async averageFocus(userId) {
    // Le pedimos a la Base de Datos que calcule el promedio (_avg) ella misma
    const result = await prisma.pomodoroSession.aggregate({
      where: {
        userId: Number(userId),
        completed: true,
      },
      _avg: {
        durationMinutes: true,
      },
    });
    // La base de datos nos devuelve un objeto con la propiedad _avg
    const promedio = result._avg.durationMinutes || 0;
    // Retornamos el promedio redondeado
    return Math.round(promedio);
  }

  // Buscar la tarea activa y su progreso
  async getActiveTaskProgress(userId) {
    const task = await prisma.task.findFirst({
      where: {
        userId: Number(userId),
        status: "en progreso",
      },
      include: {
        pomodoroSessions: {
          where: { completed: true },
        },
      },
      orderBy: { updatedAt: "desc" },
    });

    if (!task) return null;

    return {
      title: task.title,
      completed: task.pomodoroSessions.length,
      estimated: task.estimatedPomodoros || 1,
    };
  }
}

export default StastService;
