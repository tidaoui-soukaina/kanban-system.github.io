const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// connexion MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "SoukA@0304", // laisse vide si tu n'as pas mis de mot de passe
  database: "kanban"
});

db.connect(err => {
  if (err) {
    console.log("Erreur connexion MySQL :", err);
  } else {
    console.log("Connecté à MySQL !");
  }
});

app.get("/", (req, res) => {
  res.send("API Kanban fonctionne !");
});

app.listen(3000, () => {
  console.log("Serveur lancé sur port 3000");
});
//AJOUTER UN PART NUMBER
app.post("/addPart", (req, res) => {
  const { part_number, emplacement } = req.body;

  const sql = "INSERT INTO part_numbers (part_number, emplacement) VALUES (?, ?)";
  db.query(sql, [part_number, emplacement], (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur ajout");
    } else {
      res.send("Ajout réussi");
    }
  });
});
//MODIFIER UN PART NUMBER
app.put("/updatePart/:id", (req, res) => {
  const id = req.params.id;
  const { part_number, emplacement } = req.body;

  const sql = "UPDATE part_numbers SET part_number=?, emplacement=? WHERE id=?";
  db.query(sql, [part_number, emplacement, id], (err) => {
    if (err) res.status(500).send("Erreur modification");
    else res.send("Modification réussie");
  });
});
//SUPPRIMER UN PART NUMBER
app.delete("/deletePart/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM part_numbers WHERE id=?", [id], (err) => {
    if (err) res.status(500).send("Erreur suppression");
    else res.send("Supprimé");
  });
});
//LIRE LES DONNEES
app.get("/getParts", (req, res) => {
  db.query("SELECT * FROM part_numbers", (err, results) => {
    if (err) res.status(500).send("Erreur");
    else res.json(results);
  });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
