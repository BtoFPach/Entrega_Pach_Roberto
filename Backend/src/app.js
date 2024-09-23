import express from "express";
import handlabars from "express-handlebars";
import __dirname from "./utils.js";

//Importamos los routers
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";

const app = express();

app.engine("handlebars", handlabars.engine());

app.set("views", __dirname + "/views");

app.set('view engine','handlebars');

app.use(express.static(__dirname + "/public"));


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

app.use("/", viewsRouter);