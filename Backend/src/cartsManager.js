import fs from "fs";

let carts = [];
const pathFile = "./data/carts.json";

const getCarts = async (limit) => {
  const cartsJson = await fs.promises.readFile(pathFile, "utf8");
  const cartsParse = JSON.parse(cartsJson);
  carts = cartsParse || [];

  if (!limit) return carts;

  return carts.slice(0, limit);
};


const getCart = async () => {
  const cartsJson = await fs.promises.readFile(pathFile, "utf-8");
  const cartsParse = JSON.parse(cartsJson);
  carts = cartsParse || [];
};

const createCart = async () => {
  await getCart();
  const newCart = {
    id: carts.length + 1,
    products: [],
  };

  carts.push(newCart);

  await fs.promises.writeFile(pathFile, JSON.stringify(carts));
  return newCart;
};

const getCartById = async (cid) => {
  
  await getCarts();
  const cart = carts.find((c) => c.id === cid);
  return cart;
};

const addProductToCart = async (cid, pid) => {
  await getCarts();
  const product = {
    product: pid,
    quantity: 1,
  };

  const index = carts.findIndex((cart) => cart.id === cid);
  carts[index].products.push(product);


  await fs.promises.writeFile(pathFile, JSON.stringify(carts));
  
  return carts[index];
};

export default {
  getCart,
  getCarts,
  getCartById,
  addProductToCart,
  createCart,
};