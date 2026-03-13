import { createServer } from "http";
import ENV from "./src/configs/Env.js";
import app from "./src/app.js";

const server = createServer(app);

server.listen(ENV.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT}`);
});
