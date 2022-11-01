import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { routes } from "./routes";

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.options("*", cors());

app.use(express.json());

routes.forEach((route) => {
  app[route.method](route.path, route.handler);
});

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "user-manage",
  })
  .then(() => {
    console.log("Database connection ready.");
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });
