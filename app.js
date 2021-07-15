if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const os = require("os");
const cluster = require("cluster");
if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  let processLength = process.env.PROCESS_LENGTH || os.cpus().length;
  for (let i = 0; i < processLength; i++) {
    cluster.fork();
  }
} else {
  const express = require("express");
  const mongoose = require("mongoose");
  const jwt = require("jsonwebtoken");
  const cors = require("cors");
  const helmet = require("helmet");
  const mongoSanitize = require("express-mongo-sanitize");

  const authRoute = require("./routes/auth");

  const app = express();

  app.use(helmet());
  app.use(express.json());
  const db_url = process.env.DB_URL;
  mongoose
    .connect("mongodb://localhost/fam", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then((res) => {
      console.log("working");
    })
    .catch((err) => {
      console.log(err);
    });

  app.use(cors());

  app.use(
    mongoSanitize({
      replaceWith: "_",
    })
  );

  app.use("/auth", authRoute);

  app.use((req, res, next) => {
    res.status(404).json({ err: "route not found" });
  });

  app.listen(3000, () => {
    console.log("Server is started on port 3000");
  });
}
