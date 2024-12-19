import { Router } from "express";
import productsModel from "../models/products.models.js";

const router = Router();


//Obtener todos los productos

router.get('/', async (req, res) => {
  try {
      //buscamos todos los productos a travez del metodo find, gracias a mongoose
      const products = await productsModel.find({})
      console.log('productos :', products);
      res.send(products)
  } catch (error) {
      res.status(500).send(error);
  }
});

//Crea un producto

router.post("/", async (req, res) => {
  try {
    //utilizamos el modelo(schema) para la creacion del producto
    const product = new productsModel(req.body);
    console.log('Info del body :', req.body);
    
    console.log('El producto es :', product);
    //aqui salvamos el producto en BD
    await product.save();
    res.status(201).send(product);
} catch (error) {
    res.status(400).send(error);
}
});


// Obtiene un producto por id

router.get('/:id', async (req, res) => {
  try {
      //metodo de findById
      const product = await productsModel.findById(req.params.id);
      //en caso de no encontrar el producto
      if(!product){
          return res.status(404).send({
              message: 'Producto no encontrado'
          })
      }
      res.send(product);
  } catch (error) {
      res.status(500).send({
          message: 'Error al buscar el producto',
          error
      })
  }
});

// Modifica un producto por id
router.put('/:id', async (req, res) => {
  try {
      //metodo de moongose de buscar y actualizar por ID
      const product = await productsModel.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators:true});
      //en caso de no encontrar el producto
      if(!product){
          return res.status(404).send({
              message: 'No se encontro el producto'
          })
      }
      res.send(product);
  } catch (error) {
      res.status(400).send(error);
  }
});

// Borra un producto por id
router.delete('/:id', async (req, res) => {
  try {
      const product = await productsModel.findByIdAndDelete(req.params.id);
      //en caso de no encontrar el producto
      if(!product){
          return res.status(404).send({
              message: 'No se encontro el producto',
              error
          });
      }
      res.send(product)
  } catch (error) {
      res.status(400).send(error);
  }
})

export default router;