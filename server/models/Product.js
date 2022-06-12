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
    },
    mark: {
        type: Schema.Types.ObjectId,
        ref: "Mark"
    },
    subCategorie: {
        type: Schema.Types.ObjectId,
        ref: "SubCategorie"
    },
    outstanding: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Product', productSchema);