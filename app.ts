import { Application, Request, Response, NextFunction } from "express";
import morgan from "morgan";
import express from "express";
import cors from "cors";
import { AppError, HttpCode } from "./utils/AppError";
import { errorHandler } from "./middlewares/error/errorHandler";
import userroute from "./routes/user.routes";

export const appConfig = (app: Application) => {
  app
    .use(morgan("dev"))
    .use(express.json())
    .use(cors())
    .use("/api/user", userroute)
    // catch wrong routes
    .all("*", (req: Request, res: Response, next: NextFunction) => {
      next(
        new AppError({
          message: `This route${req.originalUrl} does not exist`,
          httpCode: HttpCode.NOT_FOUND,
        })
      );
    })

    //error middleware
    .use(errorHandler);
};
