import joi from "joi";

const id = joi
  .string()
  .regex(/^[0-9a-fA-F]{24}$/)
  .required();

const userId = joi
  .string()
  .regex(/^[0-9a-fA-F]{24}$/)
  .required();
const taskId = joi
  .string()
  .regex(/^[0-9a-fA-F]{24}$/)
  .required();
const type = joi
  .string()
  .valid("pomodoro", "short_break", "long_break")
  .required();
const duration = joi.number().integer().min(1).required();

export const createTimerSchema = joi.object({
  userId: userId,
  taskId: taskId,
  type: type,
  duration: duration,
});

export const timerIdParamSchema = joi.object({
  timerId: id,
});
