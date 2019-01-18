const mongoose = require('mongoose');
const passwordHash = require('password-hash');
const jwt = require('jwt-simple');
const config = require('../config/config');

var subscriptionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    descri: {
        type: String,
        required: true
    },
    mensu: {
        type: String,
        required: true
    },
    engage: {
        type: String,
        required: true
    }

}, {timestamps: {createdAt: 'created_at'}});


module.exports = mongoose.model('Subscription', subscriptionSchema);