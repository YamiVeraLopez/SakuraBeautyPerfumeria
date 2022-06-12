import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ValorationProduct = new Schema({
    valoration: {
        type: Number,
        required: true,
    },
    opinions: {
        type: String,
        required: true,
        minlength: 2
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

export default mongoose.model("ValorationProduct", ValorationProduct);