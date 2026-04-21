import PG from "pg";
import ENV from "./Env.js";

const pgPool = new PG.Pool({
  connectionString: ENV.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

pgPool.on("connect", () => {
  console.log("🔌 New DB connection established");
});

pgPool.on("error", (err) => {
  console.error("💥 Unexpected error on idle client", err);
});

export default pgPool;
