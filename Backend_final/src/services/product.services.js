import { respProductDto } from "../dto/product.dto.js";
import producdao from "../dao/product.dao.js";

const getAllProducts = async (query, options) => {
    return await producdao.getAll(query, options);
};

const getProductById = async (pid) => {
    const product = await producdao.getById(pid);
    const productResponse = respProductDto(product); 
    return productResponse;
};
     

const updateProduct = async (pid, productData) => {
    return await producdao.update(pid, productData);
};

const createProduct = async (productData) => {
    return await producdao.create(productData);
};

const deleteProduct = async (pid) => {
    return await producdao.deleteOne(pid);
};

export default {
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
};