import express from 'express';
import * as path from 'path';

const globalSetup = async () => {
  const port = process.env.PORT || 3000;
  const debugPort = process.env.DEBUG_PORT || 9222;

  process.env.PORT = String(port);
  process.env.DEBUG_PORT = String(debugPort);

  const app = express();
  app.use('/', express.static(path.resolve(__dirname, '..', 'dist')));
  const server = app.listen(port, () => {
    console.info(`Server listening on ${port}`);
  });

  return async () => {
    await new Promise((resolve, reject) => {
      try {
        console.info(`Server listening on port ${port} shutting down...`);
        resolve(server.close());
      } catch (e) {
        reject(e);
      }
    });
  }
}

export default globalSetup;