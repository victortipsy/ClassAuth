import { NextFunction } from "express";
import Joi from "joi";
import { AppError, HttpCode } from "../../utils/AppError";

export const validator = (
  schemaName: Joi.ObjectSchema,
  body: Object,
  next: NextFunction
) => {
  const value = schemaName.validate(body, {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  });
  try {
    value.error
      ? next(
          new AppError({
            httpCode: HttpCode.UNPROCESSABLE_IDENTITY,
            message: value.error.details[0].message,
          })
        )
      : next();
  } catch (error: any) {
    next(
      new AppError({
        httpCode: HttpCode.BAD_REQUEST,
        message: error.name,
      })
    );
  }
};
