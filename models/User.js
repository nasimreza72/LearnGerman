import mongoose from "mongoose";

const { Schema, model } = mongoose;
const required = true;
const unique = true;
const trim = true;

const userSchema = new Schema({
  username: { type: String, required, trim, unique },
  password: { type: String, required, minlength: 8 },
});

const User = model("user", userSchema);

export { User };
