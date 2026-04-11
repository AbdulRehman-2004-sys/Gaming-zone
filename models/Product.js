import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide product name"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Please provide product slug"],
      unique: true,
    },
    price: {
      type: Number,
      required: [true, "Please provide product price"],
    },
    mainCategory: {
      type: String,
      required: [true, "Please provide product main category"],
      enum: ["Gaming Gear", "Gaming PCs", "Gaming Furniture"],
    },
    category: {
      type: String,
      required: [true, "Please provide product category"],
    },
    image: {
      type: String, // Path to file in public/uploads
      required: [true, "Please provide product image"],
    },
    description: {
      type: String,
      required: [true, "Please provide product description"],
    },
    specs: {
      type: Map,
      of: String,
      default: {},
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isGuide: {
      type: Boolean,
      default: false,
    },
    guideContent: {
      type: String,
      default: "",
    },
    badge: {
      type: String,
      default: "",
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviewsCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
