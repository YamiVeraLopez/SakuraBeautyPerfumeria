import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Categorie = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    }
})

export default mongoose.model('Categorie', Categorie);
