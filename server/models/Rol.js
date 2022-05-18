import mongoose from "mongoose";

const Schema = mongoose.Schema;

const rolSchema = new Schema({
    id: {
        type: Number,
    },
    name: {
        type: String,
    }
})

export default mongoose.model('Rol', rolSchema);