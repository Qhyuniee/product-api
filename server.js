require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./src/routes/productRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Product API is running" });
});
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  });
