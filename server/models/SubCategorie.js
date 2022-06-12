import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SubCategorie = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    subDivision: {
        type: Array,
    },
    categorie: {
        type: Schema.Types.ObjectId,
        ref: "Categorie"
    }
})

export default mongoose.model("SubCategorie", SubCategorie);