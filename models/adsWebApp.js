import mongoose, { model } from "mongoose";
import normalize from "normalize-mongoose";

const productSchema = new mongoose.Schema(
  {
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
    },
    stockQuantity: {
      type: Number,
      required: true,
      min: 0,
    },
    availabilityStatus: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

productSchema.plugin(normalize);
export const ProductModel = model("Product", productSchema);
