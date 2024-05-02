// define the user module
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userinfoSchema = new mongoose.Schema({
    _id: { type: Schema.Types.ObjectId, ref: 'User' },
    transaction: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }],
    MoneyBox: [{type: Schema.Types.ObjectId, ref: 'MoneyBox'}],
});


module.exports = mongoose.model('UserInfo', userinfoSchema);