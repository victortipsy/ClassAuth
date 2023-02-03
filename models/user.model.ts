import { Document, model, Schema } from "mongoose";
import { Iuser } from "../interfaces/user";
import isEmail from "validator/lib/isEmail";

interface userSchema extends Document, Iuser {}

const UserSchema: Schema<userSchema> = new Schema(
  {
    name: {
      type: String,
      required: [true, "please provide your name"],
    },
    email: {
      type: String,
      required: [true, "please enter an email"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: [isEmail, "please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "please provide your password"],
    },
    confirmPassword: {
      type: String,
      required: [true, "please provide your confirm password"],
    },
    products: {
      type: Schema.Types.ObjectId,
    },
    quantity: {
      type: Number,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const userModel = model<userSchema>("users", UserSchema);

export default userModel;
