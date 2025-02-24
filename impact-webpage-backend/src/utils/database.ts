import mongoose, { mongo } from "mongoose";
import { DATABASE_URL } from "../utils/env";

const connect = async () => {
  try {
    await mongoose.connect(DATABASE_URL, {
      dbName: "IMPACT",
    });
    return Promise.resolve("Database connected!");
  } catch (error) {
    return Promise.reject(error);
  }
};

export default connect;
