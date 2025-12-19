import joi from "joi";

const id = joi.number().integer().positive().required();
const name = joi.string().alphanum().min(3).max(12);
const password = joi
  .string()
  .pattern(
    new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")
  );
const email = joi.string().email({ minDomainSegments: 2 });
const role = joi.string().valid("free", "premium");

export const createUser = joi.object({
  name: name.required(),
  password: password.required(),
  email: email.required(),
  role: role.required(),
});

export const updateUser = joi.object({
  name: name,
  email: email,
});

export const getUserIdSchema = joi.object({
  id: id,
});

export const getUser = joi.object({
  name: name,
  email: email,
  role: role,
});

export const deleteUser = joi.object({
  id: id.required(),
});
