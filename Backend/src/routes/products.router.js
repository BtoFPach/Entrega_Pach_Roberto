import { Router } from "express";

const router = Router();

//Array para almacenar
let products = [];

//Obtener todos los productos
router.get("/", (req, res) => {
  res.json(products);
});

//Crea un producto
router.post("/", (req, res) => {
  const { title, description, code, price, stock, category, thumbnails } =
    req.body;
  if (!title || !description || !code || !price || !stock || !category) {
    return res
      .status(400)
      .send("Todos los parametos son requeridos exepto thumbnails ");
  }
  const newProduct = {
    id: products.length + 1,
    title,
    description,
    code,
    price,
    status: true,
    stock,
    category,
    thumbnails: thumbnails || [],
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Obtiene un producto por id

router.get("/:pid", (req, res) => {
  const productId = parseInt(req.params.pid);
  const product = products.find((p) => p.id === productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).send("Producto no encontrado");
  }
});

// Modifica un producto por id
router.put("/:pid", (req, res) => {
  const productId = parseInt(req.params.pid);
  const productIndex = products.findIndex((p) => p.id === productId);
  if (productIndex === -1) {
    return res.status(404).send("Producto no encontrado");
  }
  const {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  } = req.body;
  const updatedProduct = {
    ...products[productIndex],
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  };
  products[productIndex] = updatedProduct;
  res.json(updatedProduct);
});

// Borra un producto por id
router.delete("/:pid", (req, res) => {
  const productId = parseInt(req.params.pid);
  products = products.filter((p) => p.id !== productId);
  res.status(204).send();
});

export default router;
