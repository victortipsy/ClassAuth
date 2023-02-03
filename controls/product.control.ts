import { Response, Request, NextFunction } from "express";
import { AppError, HttpCode } from "../utils/AppError";
import { asyncHandler } from "../utils/asyncHandler";
import { Iproducts } from "../interfaces/product";
import productModel from "../models/product.model";

export const getProduct = asyncHandler(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    const product = await productModel.find();
    if (!product)
      next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          message: "Products not found",
        })
      );

    return res.status(HttpCode.OK).json({
      status: "Success",
      data: product,
    });
  }
);

export const createProduct = asyncHandler(
  async (
    req: Request<{}, {}, Iproducts>,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    if (!req.body)
      next(
        new AppError({
          httpCode: HttpCode.BAD_REQUEST,
          message: "Enter valid inputs",
        })
      );
    const { name, price, category, rating, productImage } = req.body;

    const product = await productModel.create({
      name,
      price,
      category,
      rating,
      productImage,
    });
    if (!product)
      next(
        new AppError({
          httpCode: HttpCode.INTERNAL_SERVER_ERROR,
          message: "Products not created",
        })
      );

    return res.status(HttpCode.CREATED).json({
      status: "Success",
      data: product,
    });
  }
);
