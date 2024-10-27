import React from 'react';
import ExpenseChart from '../charts/ExpenseChart';
import { motion } from 'framer-motion';
import './Dashboard.css';

export default function Dashboard({ transactions, income }) {
  const totalExpenses = transactions.reduce((total, t) => total + t.amount, 0);
  const balance = income - totalExpenses;

  return (
    <div className="dashboard">
      <motion.div
        className="card financial-summary"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Financial Summary</h2>
        <div className="financial-details">
          <div className="financial-item">
            <h3>Income</h3>
            <span className="amount income">${income.toFixed(2)}</span>
          </div>
          <div className="financial-item">
            <h3>Total Expenses</h3>
            <span className="amount expense">${totalExpenses.toFixed(2)}</span>
          </div>
          <div className="financial-item">
            <h3>Balance</h3>
            <span className={`amount ${balance >= 0 ? 'positive' : 'negative'}`}>
              ${balance.toFixed(2)}
            </span>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="card expense-trend"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2>Expense Trend</h2>
        <ExpenseChart transactions={transactions} />
      </motion.div>
    </div>
  );
}