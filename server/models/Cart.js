import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Cart = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
    total: { type: Number, required: true },
    totalItems: { type: Number, required: true },
    size: { type: String, required: true },
    color: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

export  default mongoose.model("Cart", Cart);