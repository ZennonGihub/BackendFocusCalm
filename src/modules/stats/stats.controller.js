import TasksServices from "./stats.service.js";

const service = new TasksServices();

// Se ejecutan todas las estadisticas del dashboard en una sola llamada
export const getDashboardStats = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const [streak, successRate, averageFocus] = await Promise.all([
      service.streak(userId),
      service.successRate(userId),
      service.averageFocus(userId),
    ]);

    res.json({
      streak,
      successRate,
      averageFocus,
    });
  } catch (error) {
    next(error);
  }
};

export const createSession = async (req, res, next) => {
  try {
    const streak = await service.createSession(
      req.user.id,
      req.params.id,
      req.body
    );
    console.log("body   ", req.body);
    res.status(200).json(streak);
  } catch (error) {
    next(error);
  }
};

/*export const getExit = async (req, res, next) => {
  try {
    const tasaExito = await service.successRate(req.user.id);
    res.status(201).json(tasaExito);
  } catch (error) {
    next(error);
  }
};

export const averageFocus = async (req, res, next) => {
  try {
    const average = await service.averageFocus(req.user.id);
    res.status(201).json(average);
  } catch (error) {
    next(error);
  }
};

export const streak = async (req, res, next) => {
  try {
    const tasks = await service.streak(req.user.id);
    res.status(201).json(tasks);
  } catch (error) {
    next(error);
  }
};

*/
