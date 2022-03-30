const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/products", (req, res) => {
  const limit = req.query.limit;
  let products;

  axios
    .get("https://fakestoreapi.com/products")
    .then((response) => {
      products = response.data;
      if (!products) return res.status(500).send("Something went wron");

      if (limit) return res.send(products.slice(0, limit));

      return res.send(products);
    })
    .catch((ex) => {
      res.status(500).send("Could not connect to FakeStore API");
      console.log("Error: ", ex.message);
    });
});

app.get("/products/:id", (req, res) => {
  let product;
  const id = parseInt(req.params.id);

  axios
    .get(`https://fakestoreapi.com/products/${id}`)
    .then((response) => {
      product = response.data;
      if (!result) return res.status(404);
      return res.send(result);
    })
    .catch((ex) => {
      res.status(500).send("Could not connect to FakeStore API");
      console.log("Error: ", ex.message);
    });
});

app.get("/categories", (req, res) => {
  let categories;

  axios
    .get("https://fakestoreapi.com/products/categories")
    .then((response) => {
      categories = response.data;
      if (!categories) return res.status(404);
      return res.send(categories);
    })
    .catch((ex) => {
      res.status(500).send("Could not connect to FakeStore API");
      console.log("Error: ", ex.message);
    });
});

app.get("/product/category/:category", (req, res) => {
  let products;
  const category = req.params.category;

  axios
    .get(`https://fakestoreapi.com/products/category/${category}`)
    .then((response) => {
      products = response.data;
      if (!products) return res.status(404);
      return res.send(products);
    })
    .catch((ex) => {
      res.status(500).send("Could not connect to FakeStore API");
      console.log("Error: ", ex.message);
    });
});

app.get("/carts/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);
  let cart;

  axios
    .get(`https://fakestoreapi.com/cart?userId=${userId}`)
    .then((response) => {
      cart = response.data;
      if (!cart) return res.status(404);
      return res.send(cart);
    })
    .catch((ex) => {
      res.status(500).send("Could not connect to FakeStore API");
      console.log("Error: ", ex.message);
    });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server is now running at: ", port));
