import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductImage = new Schema({
    url: {
        type: String,
        required: true,
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product"
    }
})

export default mongoose.model("ProductImage", ProductImage);