const express = require("express");
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// CREATE - Thêm sản phẩm
router.post("/", createProduct);

// READ ALL - Lấy danh sách sản phẩm
router.get("/", getAllProducts);

// READ ONE - Lấy sản phẩm theo pid
router.get("/:pid", getProductById);

// UPDATE - Cập nhật sản phẩm
router.put("/:pid", updateProduct);

// DELETE - Xóa sản phẩm
router.delete("/:pid", deleteProduct);

module.exports = router;
