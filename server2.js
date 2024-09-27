import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import brukere from "./models/brukere.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const saltRounds = 10;
const maxAge = 1 * 24 * 60 * 60;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(cookieParser());
app.set("view engine", "ejs");

const createToken = (id, email, rolle) => {
  let secretKey = process.env.secretKey;
  return jwt.sign(
    { id, email, rolle },
    secretKey,
    { expiresIn: maxAge }
  );
};

const handleErr = (err) => {
  console.log(err.message, err.code);
};

// Middleware for error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
});

const port = 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
