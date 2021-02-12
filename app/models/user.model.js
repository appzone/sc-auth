const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: String,
    password: String,
    address: String,
    role: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);