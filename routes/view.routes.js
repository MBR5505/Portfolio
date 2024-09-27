import express from "express";
// import brukere from "../models/brukere.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const saltRounds = 10;
const maxAge = 1 * 24 * 60 * 60;

router.use(express.urlencoded({ extended: true })); 

const createToken = (id, email, rolle) => {
  let secretKey = process.env.secretKey;
  return jwt.sign({ id, email, rolle }, secretKey, { expiresIn: maxAge });
};

// Route handlers
router.get("/omMeg", (req, res) => {
  res.render("omMeg");
});

router.get("/utvikling", (req, res) => {
  res.render("utvikling");
});

router.get("/utvikling/api", (req, res) => {
  res.render("api");
});

router.get("/utvikling/annet", (req, res) => {
  res.render("annet");
});

router.get("/utvikling/annet/toDo", (req, res) => {
    res.render("index3");
});

router.get("/utvikling/api/weather", (req, res) => {
  res.render("Weather/index.ejs");
});

router.get("/utvikling/api/pokemon", (req, res) => {
  res.render("pokemon/index.ejs");
});



router.get("/design", (req, res) => {
  res.render("design");
});

router.get("/kontakt", (req, res) => {
  res.render("kontakt");
});

router.get("/", (req, res) => {
  res.render("index1");
});

router.get("/signup", (req, res) => {
  const token = req.cookies.jwt;
  let secretKey = process.env.secretKey;

  if (token) {
    jwt.verify(token, secretKey, (err, decodedToken) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("home");
        console.log(decodedToken);
      }
    });
  } else {
    res.render("index");
  }
});

router.post("/signup", (req, res) => {
  // Log the incoming request body to debug
  console.log(req.body); // Check if passord and other fields are coming through correctly

  const { brukernavn, epost, passord, confirmPass } = req.body;

  // Validate form fields
  if (!brukernavn || !epost || !passord || !confirmPass) {
    return res.status(400).send("All fields are required.");
  }

  // Check if passwords match
  if (passord !== confirmPass) {
    const errorMessage = "Passord matcher ikke"; // Passwords do not match
    console.log(errorMessage);
    return res.status(400).send(errorMessage);
  }

  // Hash the password
  bcrypt.hash(passord, saltRounds, function (err, hash) {
    if (err) {
      console.error("Error hashing password:", err);
      return res.status(500).send("Server error while hashing password.");
    }

  //   // Create a new user instance
  //   const bruker = new brukere({
  //     brukernavn,
  //     epost,
  //     rolle: "kunde", // Default role, can be customized
  //     passord: hash,
  //   });

  //   // Save the user to the database
  //   bruker
  //     .save()
  //     .then(() => {
  //       res.redirect("/login");
  //     })
  //     .catch((err) => {
  //       console.error("Error saving user:", err.message);

  //       // Handle specific validation errors
  //       if (err.errors) {
  //         if (err.errors.brukernavn)
  //           console.log("Brukernavn error:", err.errors.brukernavn.message);
  //         if (err.errors.epost)
  //           console.log("Epost error:", err.errors.epost.message);
  //         if (err.errors.passord)
  //           console.log("Passord error:", err.errors.passord.message);
  //       }
  //       res.status(400).render("404", { error: "User validation failed." });
  //     });
  // });
});

router.get("/login", async (req, res) => {
  const token = req.cookies.jwt;
  let secretKey = process.env.secretKey;

  if (token) {
    jwt.verify(token, secretKey, (err, decodedToken) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("home");
        console.log(decodedToken);
      }
    });
  } else {
    res.render("login");
  }
});

router.post("/login", async (req, res) => {
  const { brukernavn, passord, remember } = req.body;

  try {
    // const check = await brukere.findOne({ brukernavn });
    const check;
    if (!check) {
      const errorMessage = "Bruker finnes ikke";
      console.log(errorMessage);
      res.send(errorMessage);
    } else {
      const isPasswordMatch = await bcrypt.compare(passord, check.passord);
      if (isPasswordMatch) {
        const token = createToken(check._id, check.epost, check.rolle);
        const cookieOptions = {
          httpOnly: true,
          maxAge: remember ? maxAge * 1000 : undefined,
        };

        res.cookie("jwt", token, cookieOptions);
        res.cookie("admin", check.rolle === "admin", cookieOptions);

        if (check.rolle === "admin") {
          res.redirect("/admin");
        } else {
          res.redirect("/home");
        }
      } else {
        const errorMessage = "Feil Passord";
        console.log(errorMessage);
        res.send(errorMessage);
      }
    }
  } catch (err) {
    console.error(err.message, err.code);
  }
});

router.get("/admin", (req, res) => {
  if (req.cookies.admin === "true") {
    res.render("admin");
  } else {
    res.redirect("/home");
  }
});

router.get("/kina", (req, res) => {
  res.send("kina liksom Ping pong pling plong bing bang banzai kamikaze dai");
});

router.get("/home", (req, res) => {
  const token = req.cookies.jwt;
  let secretKey = process.env.secretKey;

  if (token) {
    jwt.verify(token, secretKey, (err, decodedToken) => {
      if (err) {
        res.redirect("/login");
        console.log(err);
      } else {
        res.render("home");
        console.log(decodedToken);
      }
    });
  } else {
    res.redirect("/login");
  }
});

router.get("/logout", async (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.cookie("admin", "", { maxAge: 0 });
  res.redirect("/login");
});

router.use((req, res) => {
  res.status(404).render("404");
});

export default router;
