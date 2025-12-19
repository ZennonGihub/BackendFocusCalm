import joi from "joi";

const username = joi.number().integer().positive().required();
const password = joi
  .string()
  .pattern(
    new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_])(?=.{8,})")
  );
const email = joi.string().email({ minDomainSegments: 2 });
const role = joi.string().valid("free", "premium");

export const registerSchema = joi.object({
  // username: username.required(),
  email: email.required(),
  password: password.required(),
  role: role,
});

export const loginSchema = joi.object({
  email: email.required(),
  password: joi.string().required(),
});
