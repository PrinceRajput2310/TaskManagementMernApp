import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import personRoute from "./routes/todoRoutes.js";
import userRoute from "./routes/userRoutes.js";

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://taskmanagement-prince.netlify.app",
    ],
    credentials: true,
  })
);
// app.use(cors());
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
app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Server is working fine",
  });
});

// Catch-all route
app.all("*", (req, res) => {
  res.status(404).send("404: NOT_FOUND");
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

export default app;
