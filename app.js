const path = require("path");
const express = require("express");
const morgan = require("morgan");
const workingHours = require("./middleware/workingHours");

const app = express();

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static
app.use("/public", express.static(path.join(__dirname, "public")));

// Logs
app.use(morgan("dev"));

// Middleware heures ouvrables (Mon-Fri, 09:00 <= time < 17:00)
// On l'applique seulement aux pages, pas aux assets statiques
app.use(workingHours);

// Routes
app.get("/", (req, res) => {
  res.render("pages/home", { title: "Home" });
});

app.get("/services", (req, res) => {
  res.render("pages/services", { title: "Our Services" });
});

app.get("/contact", (req, res) => {
  res.render("pages/contact", { title: "Contact us" });
});

// 404
app.use((req, res) => {
  res.status(404).render("pages/404", { title: "Not Found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
