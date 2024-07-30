import express from "express";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import cors from "cors";
import personRoute from "./routes/todoRoutes.js";
import userRoute from "./routes/userRoutes.js";




const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // frontend URL
  credentials: true,
}));
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(express.json());
// app.use(cors());
app.use(cookieParser());

// import routes
app.use("/api/v1", personRoute);
app.use("/api/v1", userRoute);

export default app;
