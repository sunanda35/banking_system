const mongoose = require('mongoose');
require('dotenv').config();

const customerUser = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Give a Your Name, Please!'],
    },
    email: {
        type: String,
        required: [true, "Give Your email. Please!"],
        unique: [true, 'This email is registered already! Give another.']
    },
    balance: {
        type: Number,
        required: [true, 'Give Customer Ammount.']
    }

}, {
    timestamps: true
})


const Customrs = mongoose.model('bhaskar', customerUser)
module.exports = Customrs;