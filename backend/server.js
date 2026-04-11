import { createServer } from 'http';
import app from './src/app.js';
import ENV from './src/configs/Env.js';

const server = createServer(app);

server.listen(ENV.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT}`);
});
