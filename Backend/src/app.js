import express from "express";

//Importamos los routers
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
const app = express();

//Inicializar el servidor
const port = 8080;
app.listen(port, () => {
  console.log("el servidor se encuetra escuchando");
});

// Middleware para analizar el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Implementar los routers que creamos
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
