const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const transactionController = require('../controllers/transactionController');

router.use(authenticate); 

router.get('/', transactionController.getTransactions);
router.post('/', transactionController.createTransaction);
router.delete('/:id', transactionController.deleteTransaction);