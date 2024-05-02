const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    title: String,
    total: Number,
    collected: Number
})

module.exports = mongoose.model('MoneyBox',  moneyBoxSchema);