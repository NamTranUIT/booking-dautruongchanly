import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { router } from "./routes/record";
import environment from "./utils/environment";
import { db } from "./common/db/connection";
import mongoose from "mongoose";
import { logger } from "./common/logger/logger";
import { errorHandler } from "./common/errors/error-handler";

const app = express();
// perform a database connection when the server starts
db.connectToServer();

const connection = mongoose.connection;
connection.on("error", logger.error.bind(console, "connection error: "));
connection.once("open", function () {
  logger.info("Connected successfully");
});

// Middlewares
app.use(express.json());
app.use(morgan("common"));
app.use(helmet());
app.use(cors());

app.use(router);
app.use(errorHandler.handleError);

const port = environment.SERVER_PORT || 3000;

app.listen(port, () => {
  logger.info(`Server is listening at http://localhost:${port}`);
});
