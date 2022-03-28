const express = require("express");
const path = require("path");
const products = require("./assets/products.json");
const categories = require("./assets/categories.json");
const carts = require("./assets/cart.json");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/products", (req, res) => {
  const limit = req.query.limit;
  if (limit) res.send(products.slice(0, limit));
  else res.send(products);
});

app.get("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const result = products.find((product) => product.id === id);
  if (!result) res.status(404);
  res.send(result);
});

app.get("/categories", (req, res) => {
  res.send(categories);
});

app.get("/assets/:file", (req, res) => {
  res.sendFile(path.join(__dirname, `assets/${req.params.file}`));
});

app.get("/product/category/:category", (req, res) => {
  const category = req.params.category;
  res.send(products.filter((product) => product.category === category));
});

app.get("/carts/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);
  res.send(carts.find((cart) => cart.userId === userId));
});

app.post("/products", (req, res) => {
  const allProducts = [...products];
  allProducts.push(req.body);
});

app.put("/product/:id", (req, res) => {
  const allProducts = [...products];
  const id = parseInt(req.params.id);
  let product = allProducts.find((product) => product.id === id);
  product = req.body;
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server is now running at: ", port));
