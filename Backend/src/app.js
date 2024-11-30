import express from "express";
import handlabars from "express-handlebars";
import __dirname from "./utils.js";
import { Server } from "socket.io";

//Importamos los routers
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import userRouter from "./routes/user.router.js";

//Importamos mongoose
import mongoose from "mongoose";

import passport from 'passport';
import cookieParser from 'cookie-parser';
import initializePassport from './config/passport.config.js';

initializePassport();

const app = express();

app.engine("handlebars", handlabars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));



// Middleware para analizar el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Implementar los routers que creamos
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);
app.use("/api/sessions", userRouter);

app.use(cookieParser());
app.use(passport.initialize());

//Inicializar el servidor
const port = 8080;
const httpServer = app.listen(port, () => {
  console.log("el servidor se encuetra escuchando");
});

mongoose
  .connect(
    "mongodb+srv://btofpach:3202coder@coder.wy2fs.mongodb.net/?retryWrites=true&w=majority&appName=coder"
  )
  .then(() => console.log("Conectado a base de datos MongoDb Atlas"))
  .catch((error) => console.error("Error en conexcion :", error));

// Configuramos socket
export const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("Nuevo usuario Conectado");

  /* socket.on("newProduct", data => {
    console.log(data);
    socket.emit("addProduct", data)
  })*/
});
