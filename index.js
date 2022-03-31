import "dotenv/config";
import Cors from "cors";
import Helmet from "helmet";
import Express from "express";
import RateLimit from "express-rate-limit";
import Morgan from "morgan";

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

app.listen(port, () => console.log(`listening on port ${port}`));
