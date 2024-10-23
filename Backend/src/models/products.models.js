import mongoose from "mongoose";

const {Schema} = mongoose;

const productsSchema = new Schema({
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

const productsModel = mongoose.model("product", productsSchema);

export default productsModel;