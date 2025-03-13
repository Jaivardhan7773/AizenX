const mongoose = require('mongoose');
const AuthSchema = new mongoose.Schema({
    name: String,
    email:  { type: String, unique: true, required: true, lowercase: true, trim: true },
    password: { type: String, required: true }, 
    phone: { type: String, required: true , unique : true , trim :true},
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    isAdmin: { type: Boolean, default: false },
  }, { versionKey: false });

module.exports= mongoose.model('newAuth', AuthSchema);