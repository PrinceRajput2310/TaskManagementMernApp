import app from "./app.js";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import dataBaseConnection from "./config/dbConnection.js";

dotenv.config({ path: ".env" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// DataBase connection
dataBaseConnection();

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});

export default app;
