import express from "express";
import { getDashboardStats, createSession } from "./stats.controller.js";
import validarHandler from "../../middlewares/validatorHandler.middleware.js";
import { createTaskSchema } from "../../schemas/tasks.schema.js";
import passport from "passport";
import { checkRoles } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.get(
  "/dashboard",
  passport.authenticate("jwt", { session: false }),
  getDashboardStats
);

router.post(
  "/createSession/:id",
  passport.authenticate("jwt", { session: false }),
  //checkRoles(1, 2),
  createSession
);

/*
router.get(
  "/averageFocus",
  passport.authenticate("jwt", { session: false }),
  //checkRoles(1, 2),
  averageFocus
);

router.get(
  "/streak",
  passport.authenticate("jwt", { session: false }),
  //checkRoles(1, 2),
  streak
);

router.get(
  "/exito",
  passport.authenticate("jwt", { session: false }),
  validarHandler(createTaskSchema, "body"),
  //checkRoles(1, 2),
  getExit
);


*/
export default router;
