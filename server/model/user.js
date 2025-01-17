const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    userName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lower : true },
    password: { type: String, required: true },
    avatar: { type: Object },
    status: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = model("User", userSchema);
module.exports = User;
