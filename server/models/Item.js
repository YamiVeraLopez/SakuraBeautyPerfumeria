import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Item = new Schema({
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    total: { type: Number, required: true },
    subTotal: { type: Number, required: true },
    discount: { type: Number},
    name: { type: String, required: true },
    barcode: { type: String, required: true },
    size: { type: String, required: true },
    color: { type: String, required: true }
});

export default mongoose.model("Item", Item);