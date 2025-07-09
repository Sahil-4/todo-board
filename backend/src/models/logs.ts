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
      required: false,
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

export const addLog = (action: string, user: string, task?: string) => {
  const log = new Log({ action, user, task });
  return log.save();
};

export const getLogs = async (userId: string, limit: number = 20, page: number = 1) => {
  const skip = (page - 1) * limit;
  const logs = await Log.find({ user: userId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("user", "username email")
    .populate("task", "title");

  const totalLogs = await Log.countDocuments({ user: userId });
  const hasMore = totalLogs > skip + limit;

  return {
    logs,
    totalLogs,
    hasMore,
  };
};
