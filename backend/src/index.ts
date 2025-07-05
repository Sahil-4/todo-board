import app from "./app.js";
import { connectDB } from "./db/connectDB.js";
import { initiateSocketIO } from "./services/socket.js";

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";

const httpServer = app.listen(PORT, async () => {
  try {
    await connectDB();
    console.info(`Server is started on http://${HOST}:${PORT}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
});

initiateSocketIO(httpServer);
