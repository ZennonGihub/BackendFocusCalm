import joi from "joi";

const id = joi.number().integer().positive().required();

const title = joi.string().min(3).max(100);
const body = joi.string().min(1).max(500).allow("");
const completed = joi.boolean();
const status = joi
  .string()
  .valid("pendiente", "en progreso", "finalizada", "pausada");

export const createTaskSchema = joi
  .object({
    title: title.required(),
    body: body,
    completed: completed,
    status: status,
  })
  .options({ allowUnknown: false });

export const getTaskIdSchema = joi.object({
  id: id,
});

export const updateTaskSchema = joi
  .object({
    title: title,
    body: body,
    completed: completed,
    status: status,
  })
  .min(1)
  .options({ allowUnknown: false });

export const deleteTaskIdSchema = joi.object({
  id: id,
});
