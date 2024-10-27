import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { categories } from '../../data/categories';
import './TransactionList.css';

export default function TransactionList({ transactions, deleteTransaction, isLoading }) {
  const getCategoryColor = (categoryName) => {
    const category = categories.find(cat => cat.name === categoryName);
    return category ? category.color : '#78909C';
  };

  return (
    <div className="transaction-list">
      <h2>Recent Transactions</h2>
      <AnimatePresence>
        {transactions.map((transaction) => (
          <motion.div
            key={transaction.id}
            className="transaction"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="transaction-info">
              <span className="category-tag" style={{ backgroundColor: getCategoryColor(transaction.category) }}>
                {transaction.category}
              </span>
              <span>{transaction.description}</span>
              <span>${transaction.amount.toFixed(2)}</span>
            </div>
            <motion.button
              onClick={() => deleteTransaction(transaction.id)}
              disabled={isLoading}
              className="delete-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Delete
            </motion.button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}