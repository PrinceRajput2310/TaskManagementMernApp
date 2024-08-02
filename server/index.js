import app from "./app.js";
import dotenv from "dotenv";
import dataBaseConnection from "./config/dbConnection.js";

dotenv.config({ path: ".env" });

// DataBase connection
dataBaseConnection();

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});

export default app;
