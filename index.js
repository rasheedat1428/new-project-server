import express, { json } from "express";
import  * as dotenv from "dotenv";
import dbConfig from "./config/db.js";
import studentRoute from "./router/studentRoute.js";

dotenv.config();
dbConfig();

const app = express();
app.use(json());

const PORT = process.env.PORT || 6000;

app.use("/students", studentRoute);

  app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
