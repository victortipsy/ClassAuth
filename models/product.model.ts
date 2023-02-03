import { Document, model, Schema } from "mongoose";
import { Iproducts } from "../interfaces/product";

interface productSchema extends Document, Iproducts {}

const ProductSchema: Schema<productSchema> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    productImage: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const productModel = model<productSchema>("products", ProductSchema);

export default productModel;
