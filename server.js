const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rajchavda6311@",
    database: "tabletrack",
});

db.connect(err => {
    if (err) throw err;
    console.log("✅ Connected to MySQL");
});

app.post("/api/orders", (req, res) => {
    const { table_number, items } = req.body;
    const query = "INSERT INTO orders (table_number, items) VALUES (?, ?)";
    db.query(query, [table_number, JSON.stringify(items)], (err, result) => {
        if (err) throw err;
        res.send({ message: "Order placed successfully!", id: result.insertId });
    });
});

app.get("/api/orders", (req, res) => {
    db.query("SELECT * FROM orders", (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.delete("/api/orders/:id", (req, res) => {
    const query = "DELETE FROM orders WHERE id = ?";
    db.query(query, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ message: "Order deleted successfully!" });
    });
});

app.listen(3000, () => console.log("🚀 Server running on port 3000"));
