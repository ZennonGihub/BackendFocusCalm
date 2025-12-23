import TasksServices from "./tasks.service.js";

const service = new TasksServices();

export const findTask = async (req, res, next) => {
  const { id } = req.params;
  try {
    const task = await service.findOne(id);
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

export const find = async (req, res, next) => {
  try {
    const tasks = await service.find();
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const task = {
      ...req.body,
      userId: userId,
    };
    const savedTask = await service.create(task);
    res.status(201).json(savedTask);
  } catch (error) {
    next(error);
  }
};

export const activateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const task = await service.activateTask(userId, id);

    res.json(task);
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
