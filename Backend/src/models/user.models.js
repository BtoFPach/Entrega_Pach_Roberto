const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: { type: String, required: true, unique: true },
  age: Number,
  password: { type: String, required: true },
  cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
  role: { type: String, default: 'user' }
});

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();
    this.password = createHash(this.password);
    next();
})

const UserModel = mongoose.model('User',userSchema);

export default UserModel;