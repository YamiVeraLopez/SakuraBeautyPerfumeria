import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    user: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        minlength: 10
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    avatar: {
        type: String,
    },
    rolesId:{
        type: mongoose.Types.ObjectId,
        ref: "Rol",
        required: true,
    },
    addressId: [{
        type: mongoose.Types.ObjectId,
        ref: "Addresse",
        required: true,
    }],
    token: {
        type: String,
    }
})

export default mongoose.model('User', userSchema);