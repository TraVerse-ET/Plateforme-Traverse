// Assuming you have installed the required packages: express, mongoose, and body-parser
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const cors = require("cors"); // Import the cors package

const app = express();

app.use(cors()); // Allow all origins; you can specify specific origins if needed
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://soumia:123@cluster0.xeer5yp.mongodb.net/feedbacks",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Create a MongoDB schema
const feedbackSchema = new mongoose.Schema({
  idUser: String,
  appreciation: Number,
  commentaire: String,
});
const RegisterSchema = new mongoose.Schema({
  email: String,
  fullName: String,
  selectedCountry: String,
  gender: String,
  password: String,
  selectedCountry: String,
});
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

// Create a MongoDB model based on the schema
const Feedback = mongoose.model("Feedback", feedbackSchema);

// Define the route to handle form submissions
app.post("/api/feedback", async (req, res) => {
  try {
    const formData = req.body;
    console.log(formData);
    const feedback = new Feedback(formData);
    await feedback.save();
    return res.json({ message: "Form data saved successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error saving data to database" });
  }
});

const Register = mongoose.model("Register", RegisterSchema);
// Define the route to handle form submissions
app.post("/api/Register", async (req, res) => {
  try {
    const formData = req.body;
    console.log(formData);
    const register = new Register(formData);
    const user = await register.save();
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Error saving register data to database" });
  }
});
const User = mongoose.model("User", userSchema);

// Route pour récupérer les utilisateurs
app.post("/api/login", async (req, res) => {
  try {
    // Récupérez tous les utilisateurs de la collection "register"
    console.log("request body email : ", req.body.email);
    const user = await Register.findOne({ email: req.body.email });
    if (user) {
      if (user.password === req.body.password) {
        return res.status(200).send({
          token: user._id,
        });
      } else {
        return res.status(401).send({ message: "Mot de passe incorrect" });
      }
    } else {
      return res
        .status(404)
        .send({ message: "Aucun utilisateur trouvé pour cet e-mail" });
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.use(
  cors({
    origin: "http://192.168.183.1:3000",
  })
);
