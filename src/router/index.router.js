import express from "express";
import { checkApiKey } from "../middlewares/auth.middleware.js";
import auth from "../modules/auth/auth.router.js";
import users from "../modules/users/users.router.js";
import tasks from "../modules/tasks/tasks.router.js";
import stats from "../modules/stats/stats.router.js";

export default function routerApi(app) {
  const router = express.Router();
  //router.use(checkApiKey);
  app.use("/api/v1", router);
  router.use("/auth", auth);
  router.use("/users", users);
  router.use("/stats", stats);
  router.use("/tasks", tasks);
}
