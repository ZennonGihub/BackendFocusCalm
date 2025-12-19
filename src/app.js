import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "./utils/index.passport.js";
import routerApi from "./router/index.router.js";
import { prisma } from "./db/prisma.js";

const app = express();

const whitelist = [
  "http://127.0.0.1:5500",
  "https://backend-focus-calm.vercel.app/",
  "http://localhost:3000",
];

const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("no permitido"));
    }
  },
  credentials: true,
};

const prismaConnect = async () => {
  try {
    await prisma.$connect();
    console.log("Conectado a la base de datos con Prisma");
  } catch (error) {
    console.error("Error al conectar a la base de datos con Prisma:", error);
  }
};

prismaConnect();

app.use(cors(options));

app.use(passport.initialize());
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use((req, res, next) => {
  console.log("🔍 Petición pasando por App.js:", req.path);
  next();
});

routerApi(app);

export default app;
