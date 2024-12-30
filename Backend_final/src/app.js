import express from "express";
import passport from 'passport';
import cookieParser from 'cookie-parser';
// import handlabars from "express-handlebars";

import session from "express-session";
import cors from "cors";

import envs from "./config/envs.config.js";
import __dirname from "./utils.js";
import connectDB from "./config/db.js";


import { initializePassport } from './config/passport.confg.js';

import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
//import viewsRouter from "./routes/views.router.js";
import sessionRouter from "./routes/session.router.js";

const app = express();

const url = envs.MONGO_URL;
connectDB(url);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: envs.SECRET_CODE, // palabra secreta
    resave: true, // Mantiene la session activa, si esta en false la session se cierra en un cierto tiempo
    saveUninitialized: true, // Guarda la session
  })
);
app.use(cors());

initializePassport();
app.use(passport.initialize());
app.use(passport.session());


// app.engine("handlebars", handlabars.engine());
// app.set("views", __dirname + "/views");
// app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

// Implementar los routers que creamos
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
//app.use("/", viewsRouter);
app.use("/api/session", sessionRouter);


//Inicializar el servidor
const port = envs.PORT;
console.log(envs.PORT);
const httpServer = app.listen(port, () => {
  console.log("el servidor se encuetra escuchando");
});