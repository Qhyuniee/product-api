const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/app");
const Product = require("../src/models/product.model");

const TEST_MONGO_URI =
  process.env.MONGO_URI_TEST ||
  "mongodb://root:example@127.0.0.1:27017/productdb_test?authSource=admin";

beforeAll(async () => {
  await mongoose.connect(TEST_MONGO_URI);
}, 30000);

afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    try {
      await mongoose.connection.dropDatabase();
    } catch (err) {
      // bỏ qua nếu chưa tạo db
    }
    await mongoose.disconnect();
  }
}, 30000);

beforeEach(async () => {
  if (mongoose.connection.readyState === 1) {
    await Product.deleteMany({});
  }
});

describe("Product API Unit Tests", () => {
  it("GET /health - should return status OK and DB UP", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("OK");
    expect(res.body.database).toBe("UP");
  });

  it("POST /products - should create a new product", async () => {
    const newProduct = {
      pid: "P01",
      pname: "Bàn phím cơ",
      price: 500000,
      quantity: 10,
    };

    const res = await request(app).post("/products").send(newProduct);

    expect(res.statusCode).toBe(201);
    expect(res.body.pid).toBe("P01");
    expect(res.body.pname).toBe("Bàn phím cơ");
  });

  it("GET /products - should return list of products", async () => {
    await Product.create({
      pid: "P02",
      pname: "Chuột không dây",
      price: 200000,
      quantity: 5,
    });

    const res = await request(app).get("/products");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
  });

  it("GET /products/:pid - should return product details", async () => {
    await Product.create({
      pid: "P03",
      pname: "Màn hình 24 inch",
      price: 3000000,
      quantity: 2,
    });

    const res = await request(app).get("/products/P03");
    expect(res.statusCode).toBe(200);
    expect(res.body.pname).toBe("Màn hình 24 inch");
  });
});
