import mongoose from "mongoose";
import { config } from "dotenv";

config();

export const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;

    if (typeof MONGO_URI !== "string") {
      throw new Error("Invalid MONGO_URI ");
    }

    await mongoose.connect(MONGO_URI, {
      appName: "todoBoard",
      dbName: "todo-board",
      retryWrites: true,
      w: "majority",
    });

    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};
