import { request, response } from "express";
import cartDao from "../dao/carts.dao.js";
import productDao from "../dao/product.dao.js";
import ticketDao from "../dao/ticket.dao.js";

const getAllCarts = async (req, res) => {
  try {
    const carts = await cartDao.getAll();
    res.status(200).json({ status: "success", carts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
};

const createCart = async (req, res) => {
  try {
    const cart = await cartDao.create();
    res.status(201).json({ status: "success", cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
};

const deleteCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartDao.deleteOne(cid);
    if (!cart)
      return res
        .status(404)
        .json({ status: "Error", msg: "Carrito no encontrado" });
    res.status(200).json({ status: "success", cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
};

const getCartById = async (req = request, res = response) => {
  try {
    const { cid } = req.params;
    const cart = await cartDao.getById(cid);
    if (!cart)
      return res
        .status(404)
        .json({ status: "Error", msg: "Carrito no encontrado" });
    res.status(200).json({ status: "success", cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
};

const addProductToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const cartUpdate = await cartDao.addProductToCart(cid, pid);

    res.status(200).json({ status: "success", payload: cartUpdate });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
};

const deleteProductToCart = async (req, res) => {
  try {
    console.log("deleteProductToCart");
    const { cid, pid } = req.params;

    const cartUpdate = await cartDao.deleteProductToCart(cid, pid);

    res.status(200).json({ status: "success", payload: cartUpdate });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
};

const updateQuantityProductInCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const cartUpdate = await cartDao.updateQuantityProductInCart(
      cid,
      pid,
      Number(quantity)
    );

    res.status(200).json({ status: "success", payload: cartUpdate });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
};

const clearProductsToCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartDao.clearProductsToCart(cid);
    if (!cart)
      return res
        .status(404)
        .json({ status: "Error", msg: "Carrito no encontrado" });

    res.status(200).json({ status: "success", cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
};

const purchaseCart = async (req = request, res = response) => {
  try {
    const { cid } = req.params;
    const cart = await cartDao.getById(cid);
    if (!cart)
      return res
        .status(404)
        .json({ status: "Error", msg: "Carrito no encontrado" });

    const total = await cartDao.purchaseCart(cid);
    const ticket = await ticketDao.createTicket(req.user.email, total);

    res.status(200).json({ status: "success", ticket });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
};
export default {
  getAllCarts,
  createCart,
  deleteCart,
  getCartById,
  addProductToCart,
  deleteProductToCart,
  updateQuantityProductInCart,
  clearProductsToCart,
  purchaseCart,
};
