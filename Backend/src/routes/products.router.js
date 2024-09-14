import { Router } from "express";
import productsManager from "../productsManager.js";

const router = Router();


//Obtener todos los productos
router.get("/", async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await productsManager.getProducts(limit);
    res.status(200).json({ status: "success", products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
});

//Crea un producto
router.post("/", async (req, res) => {
  try {
    const { title, description, code, price, stock, category, thumbnails } =
      req.body;
    if (!title || !description || !code || !price || !stock || !category) {
      return res
        .status(400)
        .json({ status: "Error", msg: "Todos los parametos son requeridos exepto thumbnails" });
    }
    const product = await productsManager.addProduct({
      title,
      description,
      code,
      price,
      stock,
      category,
      thumbnails,
    });

    res.status(201).json({ status: "success", product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
});

// Obtiene un producto por id

router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const body = req.body;
    const product = await productsManager.updateProduct(Number(pid), body);
    if (!product)
      return res
        .status(404)
        .json({ status: "Error", msg: "Producto no encontrado" });

    res.status(200).json({ status: "success", product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
});

// Modifica un producto por id
router.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const body = req.body;
    const product = await productsManager.updateProduct(Number(pid), body);
    if (!product)
      return res
        .status(404)
        .json({ status: "Error", msg: "Producto no encontrado" });

    res.status(200).json({ status: "success", product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
});

// Borra un producto por id
router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productsManager.deleteProduct(Number(pid));
    if (!product) return res.status(404).json({ status: "Error", msg: "Producto no encontrado" });

    res.status(200).json({ status: "success", msg: `El producto con el id ${pid} fue eliminado` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
});

export default router;
