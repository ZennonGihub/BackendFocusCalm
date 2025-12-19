import { connectDb } from "../db/db.js";

export const dbMiddleware = async (req, res, next) => {
  try {
    await connectDb();
    next();
  } catch (error) {
    return res.status(500).json({ message: "Database connection error" });
  }
};
