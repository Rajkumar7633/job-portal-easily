import express, { urlencoded } from "express";
import path from "path";
import expressLayouts from "express-ejs-layouts";
import jobRouter from "./src/routes/job.route.js";
import userRouter from "./src/routes/user.route.js";
import session from "express-session";
import { lastVisit } from "./src/middlewares/lastVisitMiddleware.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(cookieParser());
app.use(lastVisit);
app.use(
  session({
    secret: "vivekSecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(express.json());
app.use(express.static(path.resolve("src", "public")));
app.use(urlencoded({ extended: true }));
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path.resolve("src", "views"));
app.set("layout", path.resolve("src", "views", "layouts", "layout"));
app.use(jobRouter);
app.use(userRouter);

export default app;
