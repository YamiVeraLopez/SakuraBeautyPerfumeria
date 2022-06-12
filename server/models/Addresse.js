import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Addresse = new Schema({
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: String, required: true },
    userId : { type: Schema.Types.ObjectId, ref: 'User' }
});

export default mongoose.model("Addresse", Addresse);