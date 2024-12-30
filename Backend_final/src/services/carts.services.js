import cartsDao from "../dao/carts.dao.js";
import productDao from "../dao/product.dao.js";

const createCart = async () => {
    return await cartsDao.create();
};

const getCartById = async (cid) => {
    return await cartsDao.getById(cid);
};

const addProductToCart = async (cid, pid) => {
    return await cartsDao.addProductToCart(cid, pid);
};

const deleteProductToCart = async (cid, pid) => {
    return await cartsDao.deleteProductToCart(cid, pid);
};
const updateQuantityProductInCart = async (cid, pid, quantity) => {
    return await cartsDao.updateQuantityProductInCart(cid, pid, quantity);
};

const clearProductsToCart = async (cid) => {
    return await cartsDao.clearProductsToCart(cid);
};

const purchaseCart = async (cid) => {
    const cart = await cartsDao.getById(cid);
    let total = 0;
    const productsWithOutStock = [];

    for (const productCart of cart.products) {
        const product = await productDao.getById(productCart.product);

        if (product.stock >= productCart.quantity) {
            total += product.price * productCart.quantity;
            await productDao.update(product._id, {stock: product.stock - productCart.quantity})
        } else {
            productsWithOutStock.push(productCart);
        }

        await cartsDao.update(cid, { products: productsWithOutStock });
    }

    return total;
};

export default {
    createCart,
    getCartById,
    addProductToCart,
    deleteProductToCart,
    updateQuantityProductInCart,
    clearProductsToCart,
    purchaseCart,
};