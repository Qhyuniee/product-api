const test = require("node:test");
const assert = require("node:assert/strict");
const Product = require("../models/Product");

test("Product hop le khi du 4 truong", async () => {
  const product = new Product({
    pid: "TEST001",
    pname: "But bi",
    price: 5000,
    quantity: 10,
  });

  await assert.doesNotReject(product.validate());
});

test("Product thieu pid phai bao loi", async () => {
  const product = new Product({
    pname: "But bi",
    price: 5000,
    quantity: 10,
  });

  await assert.rejects(
    product.validate(),
    (error) => Boolean(error.errors?.pid)
  );
});

test("Product thieu price phai bao loi", async () => {
  const product = new Product({
    pid: "TEST002",
    pname: "But bi",
    quantity: 10,
  });

  await assert.rejects(
    product.validate(),
    (error) => Boolean(error.errors?.price)
  );
});

test("Product co price khong hop le phai bao loi", async () => {
  const product = new Product({
    pid: "TEST003",
    pname: "But bi",
    price: "khong-phai-so",
    quantity: 10,
  });

  await assert.rejects(
    product.validate(),
    (error) => Boolean(error.errors?.price)
  );
});
