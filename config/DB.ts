import mongoose from "mongoose";
import { envVariables } from "./environmentVariables";

const DB = envVariables.DB_STRING;

export async function dbConfig() {
  try {
    mongoose.set("strictQuery", true);
    const conn = await mongoose.connect(DB);
    console.log(`database connected to ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
}
