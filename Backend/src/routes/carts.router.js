import { Router } from "express";

const router = Router();

//Array para almacenar
let carts = [];

//Obtener todos los carts
router.get("/", (req, res) => {
  res.json(carts);
});

//Crear nuevo carts
router.post("/", (req, res) => {
  const newCarts = req.body;
  carts.push(newCarts);
  res.status(201).json(newCarts);
});

export default router;
