import { Schema, model } from "mongoose";
import normalize from "normalize-mongoose";

const userSchema = new Schema({

  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  location: { type: String },
  phone: { type: String },
  role: {
    type: String,
    default: "user",
    enum: ["user", "vendor", "admin", "superadmin"],
  },
});

userSchema.plugin(normalize);
export const userModel = model("User", userSchema);
