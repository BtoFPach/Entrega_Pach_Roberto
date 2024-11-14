import { Router } from "express";
import cartModel from "../models/carts.models.js"
import productsModels from "../models/products.models.js"
const router = Router();

router.get("/", async (req, res) => {
  try {
    const carts = await cartModel.find({});
    console.log(carts)
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
    res.status(500).send(error);
  }
});

// agregar un producto al carrito
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
    res.status(200).send(cart);
  } catch (error) {
    console.error(error);
    res.status(500).send ({message: "Eror al agregar el poroducto"})
  }
});

//Actualizar carrito

router.put("/:cid", async (req, res) => {
  try {
    console.log(req.body)
    const cart = await cartModel.findById(req.params.cid);
    if (!cart) {
      return res.status(404).send ({message: "Carrito no encontrado"})
    }
    console.log(cart.products)

    cart = cart.findByIdAndUpdate(req.params.cid, req.body, {new: true, runValidators:true});

    console.log(cart)

    
    await cart.save();
    res.status(200).send(cart);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Modificar producto del carrito
router.put('/:cid/product/:pid', async (req, res) => {
  try {
    
    const { cid, pid } = req.params;
    
   console.log(req.body.quantity)
    const product = await productsModels.findById(req.params.pid);
    if (!product) return res.status(404).send({  message: `No se encontró el producto con el id ${pid}` });
    const cart = await cartModel.findById(req.params.cid);
    if (!cart) return res.status(404).send({  message: `No se encontró el carrito con el id ${cid}` });
    
    const cartUpdate = cart.products.find( element => element.product == req.params.pid);
    console.log(cartUpdate)

    cartUpdate.quantity = req.body.quantity;
    await cart.save();

    res.status(200).send(cart);

  } catch (error) {
    console.error(error);
    res.status(500).send ({message: "Eror al agregar el poroducto"})
  }
});

//Borrar un producto del carrito

router.delete("/:cid/product/:pid", async (req, res) => {
  try {
    const product = await productsModels.findById(req.params.pid);
    if (!product) return res.status(404).send({  message: `No se encontró el producto` });
    const cart = await cartModel.findById(req.params.cid);
    if (!cart) return res.status(404).send({  message: `No se encontró el carrito` });
    
    cart.products = cart.products.filter((element) => element.product != req.params.pid);

  await cart.save();

    res.status(200).send(cart);
  } catch (error) {
    console.log(error);
    res.status(500).send ({message: "Error interno del servidor" });
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

