const mongoose = require('mongoose');
const passwordHash = require('password-hash');
const jwt = require('jwt-simple');
const config = require('../config/config');

let userSchema = mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: false
    },
    firstname: {
        type: String,
        required: false
    },
    account: {
        type: String,
        required: true
    },

    sub: {
        type: Array,
        required: true
    },

    infoCompany: {
        type: Array,
        required: false
    }
}, {timestamps: {createdAt: 'created_at'}});


userSchema.methods = {
    authenticate: function (password) {
        return passwordHash.verify(password, this.password);
    },
    getToken: function () {
        return jwt.encode(this, config.secret);
    }
};

module.exports = mongoose.model('User', userSchema);