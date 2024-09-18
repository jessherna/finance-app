const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;