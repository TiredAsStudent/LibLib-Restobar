import mongoose from "mongoose";

const VariantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const ImageSchema = new mongoose.Schema(
  {
    url: { type: String, trim: true },
  },
  { _id: false }
);

const MenuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      index: true,
      default: "Uncategorized",
      trim: true,
    },
    basePrice: { type: Number, required: true, min: 0 },
    image: ImageSchema,
    availability: { type: Boolean, default: true },
    variants: [VariantSchema],
  },
  { timestamps: true }
);

MenuItemSchema.index({
  name: "text",
});

export default mongoose.model("MenuItem", MenuItemSchema);
