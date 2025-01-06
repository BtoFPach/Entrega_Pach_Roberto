import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productsCollection = "product"

const productsSchema = new mongoose.Schema({
  title: String,
  description: String,

  price: Number,

  thumbnail: {
    type: Array,
    default: [],

  },
  code: String,

  stock: Number,

  category: String,
  status: {
    type: Boolean,
    default: true,
  },
});

productsSchema.plugin(mongoosePaginate);

const productsModel = mongoose.model(productsCollection, productsSchema);

export default productsModel;