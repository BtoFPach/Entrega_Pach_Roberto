import cartModel from "../models/carts.models.js";

const getAll = async () => {
  const carts = await cartModel.find();
  return carts;
};

const getById = async (id) => {
  const cart = await cartModel.findById(id).populate("products.product");
  return cart;
};

const create = async () => {
  const cart = await cartModel.create({});

  return cart;
};

const update = async (id, data) => {
  const cartUpdate = await cartModel.findByIdAndUpdate(id, data, { new: true });
  return cartUpdate;
};

const deleteOne = async (id) => {
  const cart = await cartModel.deleteOne({ _id: id });
  return cart;
};

const addProductToCart = async (cid, pid) => {
 

  const cart = await cartModel.findById(cid);

  const productInCart = cart.products.find((element) => element.product == pid);
  if (productInCart) {
    productInCart.quantity++;
  } else {
    cart.products.push({ product: pid, quantity: 1 });
  }

  await cart.save(); // Guardamos los cambios realizado en la base de datos de mongo
  return cart;
};

const deleteProductToCart = async (cid, pid) => {
  const cart = await cartModel.findById(cid);

  cart.products = cart.products.filter((element) => element.product != pid);

  await cart.save();

  return cart;
};

const updateQuantityProductInCart = async (cid, pid, quantity) => {
  const cart = await cartModel.findById(cid);
  const product = cart.products.find((element) => element.product == pid);
  product.quantity = quantity;

  await cart.save();
  return cart;
};

const clearProductsToCart = async (cid) => {
  const cart = await cartModel.findById(cid);
  cart.products = [];

  await cart.save();

  return cart;
};

export default {
  getAll,
  getById,
  create,
  update,
  deleteOne,
  addProductToCart,
  deleteProductToCart,
  updateQuantityProductInCart,
  clearProductsToCart,
};