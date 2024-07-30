import mongoose from "mongoose";

const dataBaseConnection = () => {
  mongoose
    .connect(process.env.MongodbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Connection error", error));
};

export default dataBaseConnection;
