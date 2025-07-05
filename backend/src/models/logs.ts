import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Log = mongoose.model("Log", logSchema);
export default Log;
export { logSchema };
export type { Log as LogType, logSchema as LogSchemaType };
