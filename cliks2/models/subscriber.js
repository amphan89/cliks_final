const mongoose = require('mongoose')

const subscriberSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    subscriberDate: {
        type: Date,
        required: true,
        default: Date.now
    },
})

module.exports = mongoose.model('subscriber', subscriberSchema)