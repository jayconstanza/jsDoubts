import "dotenv/config";
import Cors from "cors";
import Helmet from "helmet";
import Express from "express";
import RateLimit from "express-rate-limit";
import Morgan from "morgan";
import Mongoose from "mongoose";
import TodoRouter from './routes/routes.todo.mjs'

const limiter = RateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const app = Express();
const port = process.env.PORT || 3000;

app.use(Cors());
app.use(Helmet());
app.use(limiter);
app.use(Morgan("tiny"));
app.use(Express.json());
app.use('/api/v1', TodoRouter)

Mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log(`Could not connect to MongoDB...${err}`));

app.listen(port, () => console.log(`listening on port ${port}`));
