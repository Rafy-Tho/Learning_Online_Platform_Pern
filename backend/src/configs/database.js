import PG from "pg";
import ENV from "./Env.js";
import {
  DB_CONNECTION_TIMEOUT,
  DB_IDLE_TIMEOUT,
  DB_POOL_SIZE,
} from "../constants/constants.js";

const pgPool = new PG.Pool({
  host: ENV.DB_HOST,
  port: ENV.DB_PORT,
  user: ENV.DB_USER,
  password: ENV.DB_PASSWORD,
  database: ENV.DB_NAME,
  max: DB_POOL_SIZE,
  idleTimeoutMillis: DB_IDLE_TIMEOUT,
  connectionTimeoutMillis: DB_CONNECTION_TIMEOUT,
});

pgPool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

export default pgPool;
