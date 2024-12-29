import mongoose from 'mongoose';

const connectDB = async (url) => {
  try {
    const conn = await mongoose.connect(url);
    console.log("MongoDB Connected:");
    return conn;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);

  }
};

export default connectDB;