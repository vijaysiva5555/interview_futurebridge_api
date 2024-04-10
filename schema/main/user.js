let mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId

//User Schema
let userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        lowercase: true
    },
    country: {
        type: String,
        trim: true
    },
    phone: {
        type: Number,
        required: true,
        trim: true
    },
    about: {
        type: String,
        trim: true
    },
    createdBy: {
        type: ObjectId
    },
    systemInfo: {
        type: Object
    },
    status: {
        type: Number,
        default: 1
    },
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model("user", userSchema);


