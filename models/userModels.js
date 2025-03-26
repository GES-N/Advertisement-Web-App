import { optional } from "joi";
import { Schema, model } from "mongoose";
import normalize from "normalize-mongoose";

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  website: { type: String },
  phone: { type: String },
  contactName:{ type: String, optional },
  businessAddress: { type: String },
  uploadLogo:{ type: String },


  role: {
    type: String,
    default: "user",
    enum: ["user", "vendor"],
  },
});

userSchema.plugin(normalize);
export const userModel = model("User", userSchema);
