import express from 'express';
import routes from './routes/index.js';
import cors from 'cors'

const app = express();

app
  .use(
    express.json(),
    express.urlencoded({
      extended: true,
    }),
    cors(),
  );

routes(app);

export default app;
