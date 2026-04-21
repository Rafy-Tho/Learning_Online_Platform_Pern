import { createServer } from "http";
import app from "./src/app.js";
import ENV from "./src/configs/Env.js";
import pgPool from "./src/configs/database.js";

const server = createServer(app);

async function startServer() {
  try {
    await pgPool.query("SELECT 1");
    console.log("✅ DB READY");

    server.listen(ENV.PORT, () => {
      console.log("🚀 Server running");
    });
  } catch (err) {
    console.error("❌ Cannot start server, DB not connected");
  }
}

startServer();
