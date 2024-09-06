import mongoose from "mongoose";
import validator from "validator";

const { isEmail } = validator;

// Correct the connection string here; choose the appropriate one based on where you are connecting:
// Option 1: Local MongoDB connection
// const connect = mongoose.connect("mongodb://localhost:27017/", { dbName: "AdminSite" });

// Option 2: MongoDB Atlas connection (ensure the credentials are correct)
const connect = mongoose.connect("mongodb+srv://mbroneid1:Diggimbr1@firstcluster.mwm7yhr.mongodb.net/", {
  dbName: "AdminSite",
});

connect
  .then(() => {
    console.log("Du er koblet til databasen");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err.message);
  });

// Define the schema
const skjema = mongoose.Schema;

const brukerSkjema = new skjema(
  {
    brukernavn: {
      type: String,
      required: true,
      unique: true,
    },
    epost: {
      type: String,
      required: [true, "Enter email"],
      lowercase: true,
      unique: [true, "This email is already in use"],
      validate: [isEmail, "Enter a valid email"],
    },
    rolle: {
      type: String,
      lowercase: true,
    },
    passord: {
      type: String,
      required: [true, "Enter password"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
  },
  { timestamps: true }
);

// Create the model
const brukere = mongoose.model("brukere", brukerSkjema);

export default brukere;
