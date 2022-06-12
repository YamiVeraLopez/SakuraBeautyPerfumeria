import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Favorite = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }]
});

export default mongoose.model("Favorite", Favorite);