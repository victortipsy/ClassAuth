import { Document, Schema } from "mongoose";

export interface Iuser extends Document {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  products: Schema.Types.ObjectId;
  quantity: number;
}
