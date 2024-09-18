const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const verifyToken = require('../middleware/authMiddleware');

router.post('/', verifyToken, transactionController.createTransaction);
router.get('/', verifyToken, transactionController.getTransactions);
router.put('/:id', verifyToken, transactionController.updateTransaction);
router.delete('/:id', verifyToken, transactionController.deleteTransaction);

module.exports = router;