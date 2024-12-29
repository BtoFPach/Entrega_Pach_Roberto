import express from "express";
import envs from "./config/envs.config.js";
// import handlabars from "express-handlebars";
import __dirname from "./utils.js";
import connectDB from "./config/db.js";
import passport from 'passport';
import cookieParser from 'cookie-parser';
import initializePassport from './config/passport.confg.js';

import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import sessionRouter from "./routes/session.router.js";

const app = express();
initializePassport();

// app.engine("handlebars", handlabars.engine());
// app.set("views", __dirname + "/views");
// app.set("view engine", "handlebars");
// app.use(express.static(__dirname + "/public"));

// Middleware para analizar el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Implementar los routers que creamos
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);
app.use("/api/session", sessionRouter);

app.use(cookieParser());
app.use(passport.initialize());

//Inicializar el servidor
const port = envs.PORT;
console.log(envs.PORT);
const httpServer = app.listen(port, () => {
  console.log("el servidor se encuetra escuchando");
});

const url = envs.MONGO_URL;

connectDB(url);
