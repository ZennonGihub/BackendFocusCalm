import express from "express";
import passport from "passport";
import {
  findUser,
  find,
  remove,
  changeUser,
} from "./../controllers/users.controller.js";
import {
  updateUser,
  getUserIdSchema,
  deleteUser,
} from "./../schemas/users.schema.js";
import { checkRoles } from "../middlewares/auth.middleware.js";
import validarHandler from "./../middlewares/validatorHandler.middleware.js";

const router = express.Router();

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validarHandler(getUserIdSchema, "params"),
  checkRoles("free", "premium"),
  findUser
);

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validarHandler(getUserIdSchema, "params"),
  validarHandler(updateUser, "body"),
  checkRoles("free", "premium"),
  changeUser
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validarHandler(deleteUser, "params"),
  checkRoles("free", "premium"),
  remove
);
