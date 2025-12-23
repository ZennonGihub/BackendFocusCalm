import express from "express";
import {
  findTask,
  find,
  changeTask,
  remove,
  createTask,
  activateTask,
} from "./tasks.controller.js";
import validarHandler from "../../middlewares/validatorHandler.middleware.js";
import {
  createTaskSchema,
  getTaskIdSchema,
  updateTaskSchema,
  deleteTaskIdSchema,
} from "../../schemas/tasks.schema.js";
import passport from "passport";
import { checkRoles } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  //checkRoles(1, 2),
  find
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validarHandler(createTaskSchema, "body"),
  //checkRoles(1, 2),
  createTask
);

router.patch(
  "/:id/activate",
  passport.authenticate("jwt", { session: false }),
  activateTask
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validarHandler(getTaskIdSchema, "params"),
  checkRoles("free", "premium"),
  findTask
);
router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validarHandler(getTaskIdSchema, "params"),
  validarHandler(updateTaskSchema, "body"),
  //checkRoles(1, 2),
  changeTask
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validarHandler(deleteTaskIdSchema, "params"),
  //checkRoles(1, 2),
  remove
);

export default router;
