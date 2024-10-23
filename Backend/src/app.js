import express from "express";
import handlabars from "express-handlebars";
import __dirname from "./utils.js";
import { Server } from "socket.io";

//Importamos los routers
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";

//Importamos los mongoose
import mongoose from "mongoose";

const app = express();

app.engine("handlebars", handlabars.engine());

app.set("views", __dirname + "/views");

app.set('view engine','handlebars');

app.use(express.static(__dirname + "/public"));


//Inicializar el servidor
const port = 8080;
const httpServer = app.listen(port, () => {
  console.log("el servidor se encuetra escuchando");
});

mongoose.connect("mongodb+srv://btofpach:3202coder@coder.wy2fs.mongodb.net/?retryWrites=true&w=majority&appName=coder")
    .then(() => console.log('Conectado a base de datos MongoDb Atlas'))
    .catch((error) => console.error('Error en conexcion :', error))


// Middleware para analizar el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Implementar los routers que creamos
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.use("/", viewsRouter);

// Configuramos socket
export const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("Nuevo usuario Conectado")

 /* socket.on("newProduct", data => {
    console.log(data);
    socket.emit("addProduct", data)
  })*/
});
