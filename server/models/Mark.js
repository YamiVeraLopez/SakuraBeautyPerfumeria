import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Mark = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    logo: {
        type: String,
        required: false,
        minlength: 2
    }
})

export default mongoose.model('Mark', Mark);
