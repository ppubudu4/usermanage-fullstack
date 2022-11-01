import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
  fullName: { type: String },
  info: {
    fullName: { type: String, default: "" },
    age: { type: Number, default: "" },
    gender: { type: String, default: "" },
    favoriteFood: { type: String, default: "" },
    hairColor: { type: String, default: "" },
  },
  isAdmin: { type: Boolean, default: false },
});

// use this to copy _id to "id" this virtual field
userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

userSchema.set("toJSON", {
  virtuals: true,
});

exports.User = mongoose.model("User", userSchema);
exports.userSchema = userSchema;
