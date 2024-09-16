import { Router } from "express";
import cartsManager from "../cartsManager.js";
import productsManager from "../productsManager.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    console.log("hola")
    const { limit } = req.query;
    const carts = await cartsManager.getCarts(limit);
    res.status(200).json({ status: "success", carts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
});

router.post("/", async (req, res) => {
  try {
    const cart = await cartsManager.createCart();

    res.status(201).json({ status: "success", cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartsManager.getCartById(Number(cid));
    if (!cart) return res.status(404).json({ status: "Error", msg: "Carrito no encontrado" });

    res.status(200).json({ status: "success", cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const product = await productsManager.getProductById(Number(pid));
    if (!product) return res.status(404).json({ status: "Error", msg: "Producto no encontrado" });

    const cart = await cartsManager.addProductToCart(Number(cid), Number(pid));
    if (!cart) return res.status(404).json({ status: "Error", msg: "Carrito no encontrado" });

    res.status(200).json({ status: "success", cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
});

export default router;

