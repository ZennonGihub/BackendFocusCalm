import Service from "./users.service.js";

const userService = new Service();

export const findUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await userService.findOne(id);
    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
};

export const find = async (req, res, next) => {
  try {
    const users = await userService.findUsers();
    res.status(201).json({ users });
  } catch (error) {
    next(error);
  }
};

export const changeUser = async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const newUser = await userService.changeUser(id, body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};
export const remove = async (req, res, next) => {
  const id = req.params.id;
  try {
    const userRemoved = await userService.remove(id);
    res.status(200).json(userRemoved);
  } catch (error) {
    next(error);
  }
};
