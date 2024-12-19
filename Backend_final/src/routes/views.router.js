import express from "express";
import productsModel from "../models/products.models.js";

const router = express.Router();

// view products home
router.get("/", async (req, res) => {
  let page = parseInt(req.query.page)
  let rows = parseInt(req.query.rows)
  if(!page) page =1;
  if(!rows) rows =10;

  try{
    let result = await productsModel.paginate({},{page, limit: rows, lean:true}) 

    //console.log(result)
    
    result.prevLink = result.hasPrevPage ?  `http://localhost:8080/?page=${result.prevPage}&rows=${rows}` : '';
    result.nextLink = result.hasNextPage ?  `http://localhost:8080/?page=${result.nextPage}&rows=${rows}` : '';
    result.isValid = !(page<=0 || page > result.totalPages);
    res.render("home", result)
  }
   catch (error) {
    console.log(error);
    res.status(500).json({ eror: "error interno del servidor" });
  }
});

// view product


router.get("/product/:id", async (req, res) => {
  try {
      //metodo de findById
      const product = await productsModel.findById(req.params.id);
      //en caso de no encontrar el producto
      if(!product){
          return res.status(404).send({
              message: 'Producto no encontrado'
          })
      }
      //console.log("producto")
      //console.log(product)

      res.render("product", {product: product.toObject()});
  } catch (error) {
      res.status(500).send({
          message: 'Error al buscar el producto',
          error
      })
  }
});
router.delete('/product', async (req, res) => {
  try {
    const { id } = req.body;
      const product = await productsModel.findByIdAndDelete(id);
      //en caso de no encontrar el producto
      if(!product){
          return res.status(404).send({
              message: 'No se encontro el producto',
              error
          });
      }
      res.status(200).send(product);
  } catch (error) {
      res.status(400).send(error);
  }
})

router.put('/product', async (req, res) => {
  try {
      //metodo de moongose de buscar y actualizar por ID
      const { id } = req.body;
      console.log(id)
      const product = await productsModel.findByIdAndUpdate(id, req.body, {new: true, runValidators:true});
      //en caso de no encontrar el producto
      if(!product){
          return res.status(404).send({
              message: 'No se encontro el producto'
          })
      }
      res.status(200).send(product);
  } catch (error) {
      res.status(400).send(error);
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

/*router.get('/realtimeproducts', async (req, res) => {
  try{
      const products = await productsModel.find();
  

      res.render('products', { products : products.map( product => product.toObject() )})
  }catch (error){
      return res.render('error', {error: 'Error al obtener todos los productos'});
  }

})*/



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
