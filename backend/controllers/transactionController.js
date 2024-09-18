const Transaction = require('../models/Transaction');

// Create a new transaction
exports.createTransaction = async (req, res) => {
    const { date, description, amount } = req.body;
    const userId = req.userId; // Assuming userId is set in the request by auth middleware
    try {
        const transaction = await Transaction.create({
            date,
            description,
            amount,
            userId
        });
        res.json(transaction);
    } catch (error) {
        res.status(500).json({ error: 'Error creating transaction' });
    }
};

// Get all transactions for a user
exports.getTransactions = async (req, res) => {
    const userId = req.userId; // Assuming userId is set in the request by auth middleware
    try {
        const transactions = await Transaction.find({ userId });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching transactions' });
    }
};

// Update a transaction
exports.updateTransaction = async (req, res) => {
    const { id } = req.params;
    const { date, description, amount } = req.body;
    try {
        const transaction = await Transaction.findByIdAndUpdate(
            id,
            { date, description, amount },
            { new: true }
        );
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.json(transaction);
    } catch (error) {
        res.status(500).json({ error: 'Error updating transaction' });
    }
};

// Delete a transaction
exports.deleteTransaction = async (req, res) => {
    const { id } = req.params;
    try {
        const transaction = await Transaction.findByIdAndDelete(id);
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting transaction' });
    }
};