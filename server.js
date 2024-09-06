import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import viewRoutes from './routes/view.routes.js';

const app = express();

app.set('view engine', 'ejs');
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`);
});

app.use(express.urlencoded({ extended: true })); 

app.use(express.json());
app.use(cookieParser());

app.use('/', viewRoutes);

import bodyParser from "body-parser";
import morgan from "morgan";
import brukere from './models/brukere.js'; // Adjust based on the relative path from `server.js`
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

dotenv.config();

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
