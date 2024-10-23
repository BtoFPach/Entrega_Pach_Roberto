import { Router } from "express";
import productsModel from "../models/products.models.js";

import { io } from "../app.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await productsModel.find({}).lean();
    console.log(products)
    res.render("home", { products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ eror: "error interno del servidor" });
  }
});

router.get("/realtimeproducts", async (req, res) => {
  try {
    const products = await productsModel.find({}).lean();
    console.log(products);

    res.render("realTimeProducts", { products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post("/realtimeproducts", async (req, res) => {
  try {
    const newProduct = new productsModel(req.body);

    console.log("post");
    console.log(req.body);
    const product = await newProduct.save();

    const products =  await productsModel.find({}).lean();
    io.emit("products", products);

    res.status(201).json({ status: "success", product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error interno del servidor, post" });
  }
});


router.delete("/realtimeproducts", async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id)
    const product = await productsModel.findByIdAndDelete(id);
    const products =  await productsModel.find({}).lean();
    io.emit("products", products);

    res
      .status(200)
      .json({
        status: "success",
        msg: `El producto con el id ${id} fue eliminado`,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;
