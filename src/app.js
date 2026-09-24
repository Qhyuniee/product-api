const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model");

const app = express();
app.use(express.json());

// Healthcheck endpoint (dùng cho bước 9)
app.get("/health", (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? "UP" : "DOWN";
  res
    .status(dbStatus === "UP" ? 200 : 500)
    .json({ status: "OK", database: dbStatus });
});

// [CREATE] Tạo sản phẩm mới
app.post("/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// [READ ALL] Lấy danh sách sản phẩm
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// [READ ONE] Lấy 1 sản phẩm theo pid
app.get("/products/:pid", async (req, res) => {
  try {
    const product = await Product.findOne({ pid: req.params.pid });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// [UPDATE] Cập nhật sản phẩm theo pid
app.put("/products/:pid", async (req, res) => {
  try {
    const updated = await Product.findOneAndUpdate(
      { pid: req.params.pid },
      req.body,
      { new: true, runValidators: true },
    );
    if (!updated) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// [DELETE] Xóa sản phẩm theo pid
app.delete("/products/:pid", async (req, res) => {
  try {
    const deleted = await Product.findOneAndDelete({ pid: req.params.pid });
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;
