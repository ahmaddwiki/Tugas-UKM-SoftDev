const express = require('express');
const router = express.Router();
const pool = require("./pool");

// Get all shoes
router.get("/shoes", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM sepatu");
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving data from database");
  }
});

// Get shoe by ID
router.get("/shoes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM sepatu WHERE id = $1", [
      id,
    ]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send("Shoe not found");
    }
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving data from database");
  }
});

// Create a new shoe
router.post("/shoes/add", async (req, res) => {
  const { brand, model, size, color, price } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query(
      "INSERT INTO sepatu (brand, model, size, color, price) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [brand, model, size, color, price]
    );
    res.status(201).json(result.rows[0]);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error inserting data into database");
  }
});

// Update a shoe
router.put("/shoes/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { brand, model, size, color, price } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query(
      "UPDATE sepatu SET brand = $1, model = $2, size = $3, color = $4, price = $5 WHERE id = $6 RETURNING *",
      [brand, model, size, color, price, id]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send("Shoe not found");
    }
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating data in database");
  }
});

// Delete a shoe
router.delete("/shoes/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const client = await pool.connect();
    const result = await client.query(
      "DELETE FROM sepatu WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length > 0) {
      res.json({ message: "Shoe deleted successfully" });
    } else {
      res.status(404).send("Shoe not found");
    }
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting data from database");
  }
});

module.exports = router;
