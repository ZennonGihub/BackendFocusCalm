import TasksServices from "./tasks.service.js";

const service = new TasksServices();

export const findTask = async (req, res, next) => {
  const { id } = req.params;
  try {
    const task = await service.findOne(id);
    res.status(201).json({ task });
  } catch (error) {
    next(error);
  }
};

export const find = async (req, res, next) => {
  try {
    const tasks = await service.find();
    res.status(201).json(tasks);
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

export const createTask = async (req, res, next) => {
  try {
    const user = req.user;
    const task = {
      ...req.body,
      userId: user.user.id,
    };
    const savedTask = await service.create(task);
    res.status(201).json(savedTask);
  } catch (error) {
    next(error);
  }
};

export const changeTask = async (req, res, next) => {
  try {
    const newTask = await service.update(req.params.id, req.body);
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};
export const remove = async (req, res, next) => {
  try {
    const removeTask = await service.delete(req.params.id);
    res.status(200).json(removeTask);
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

export const getExit = async (req, res, next) => {
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
