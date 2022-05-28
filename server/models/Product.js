import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    mainFeatures: {
        type: String,
        required: true,
        minlength: 5
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
    },
    barcode: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    },
    colors: {
        type: Array
    },
    size: {
        type: Array
    }
})

export default mongoose.model('Product', productSchema);