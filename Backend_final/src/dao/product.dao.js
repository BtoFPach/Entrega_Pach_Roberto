import productModel from "../models/products.models.js";

async function getAll(query, options) {
    const products = await productModel.paginate(query, options);
    return products;
}

const getById = async (id) => {
  const product = await productModel.findById(id);
  return product;
};

const create = async (data) => {
  const product = await productModel.create(data);
  return product;
};

const update = async (id, data) => {
  const productUpdate = await productModel.findByIdAndUpdate(id, data, { new: true });
  return productUpdate;
};

const deleteOne = async (id) => {
  const product = await productModel.findByIdAndDelete(id, { status: false }, { new: true });
  return product;
};

export default {
  getAll,
  getById,
  create,
  update,
  deleteOne
}