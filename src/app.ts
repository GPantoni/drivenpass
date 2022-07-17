import express, { json } from 'express';
import 'express-async-errors';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routers/router.js';
import errorHandler from './middlewares/errorHandler.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(json());

app.use(router);
app.use(errorHandler);

const port = +process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server up and running on PORT ${port}`);
});
