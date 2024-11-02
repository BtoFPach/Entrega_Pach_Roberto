import { Router } from "express";
import cartModel from "../models/carts.models.js"
import productsModels from "../models/products.models.js"
const router = Router();

router.get("/", async (req, res) => {
  try {
    const carts = await cartModel.find({});
    res.status(200).send(carts);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const cart = new cartModel(req.body);
    await cart.save()
    res.status(201).send( cart );
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:cid", async (req, res) => {
  try {
    console.log(req.params)
    const cart = await cartModel.findById(req.params.cid)
    if (!cart) 
      return res.status(404).send({
        message: 'No se encontro el carrito'
    })

    res.status(200).send(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const cart = await cartModel.findById(req.params.cid);
    if (!cart) {
      return res.status(404).send ({message: "Carrito no encontrado"})
    }

    // Buscar si el producto ya existe en el carrito
    const existingProduct = cart.products.find(p => p.product.toString() === req.params.pid);

    if (existingProduct) {
      // Incrementar la cantidad si el producto ya existe
      existingProduct.quantity++;
    } else {
      // Agregar el producto al carrito
      cart.products.push({ product: req.params.pid, quantity: 1 });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).send ({message: "Eror al agregar el poroducto"})
  }
});



router.delete('/:cid', async (req, res) => {
  try {
      const cart = await cartModel.findByIdAndDelete(req.params.cid);
      //en caso de no encontrar el carrito
      if(!carr){
          return res.status(404).send({
              message: 'No se encontro el carrito',
              error
          });
      }
      res.send(cart)
  } catch (error) {
      res.status(400).send(error);
  }
})
export default router;

