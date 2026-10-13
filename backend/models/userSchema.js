const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    UserEmail: {
        type: String,
        required: true,
        unique: true
    },
    UserPassword: {
        type: String,
        required: true
    },
    roles: [{
        type: mongoose.Schema.ObjectId,
        ref: "Roles"
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});
const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;