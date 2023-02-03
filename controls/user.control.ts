import { Request, Response, NextFunction } from "express";
import userModel from "../models/user.model";
import { asyncHandler } from "../utils/asyncHandler";
import { AppError, HttpCode } from "../utils/AppError";
import { Iuser } from "../interfaces/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateToken } from "../middlewares/authorization/user.auth";

export const register = asyncHandler(
  async (
    req: Request<{}, {}, Iuser>,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const { name, email, password, confirmPassword } = req.body;
    const salt: string = await bcrypt.genSalt(10);
    const hashed: string = await bcrypt.hash(password, salt);
    const user = await userModel.create({
      name,
      email,
      password: hashed,
      confirmPassword: hashed,
    });
    if (!user)
      next(
        new AppError({
          httpCode: HttpCode.BAD_REQUEST,
          message: "User not created",
        })
      );

    return res.status(HttpCode.CREATED).json({
      user,
    });
  }
);

export const login = asyncHandler(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const { email, password } = req.body;
    if (!email || !password) {
      next(
        new AppError({
          message: "User not found",
          httpCode: HttpCode.BAD_REQUEST,
        })
      );
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      next(
        new AppError({
          message: "User not found",
          httpCode: HttpCode.NOT_FOUND,
        })
      );
    }
    const checkpass = await bcrypt.compare(password, user!.password);
    if (!checkpass) {
      next(
        new AppError({
          message: "Email or password not correct",
          httpCode: HttpCode.UNAUTHORIZED,
        })
      );
    }

    const token = generateToken({ email: user!.email, _id: user!._id });
    return res.status(HttpCode.OK).json({
      message: `Welcome ${user!.name}`,
      token: token,
    });
  }
);

export const allusers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user = await userModel.find().populate([
      {
        path: "products",
        options: {
          sort: {
            createdAt: -1,
          },
        },
      },
      {
        path: "quantity",
      },
    ]);

    return res.status(201).json({
      data: user,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
