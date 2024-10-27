import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { categories } from '../../data/categories';
import './AddTransactionForm.css';

export default function AddTransactionForm({ addTransaction, isLoading }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      description,
      amount: parseFloat(amount),
      category,
      date: new Date().toISOString(),
    });
    setDescription('');
    setAmount('');
    setCategory('');
  };

  return (
    <div className="add-transaction-form">
      <h2>Add New Transaction</h2>
      <form onSubmit={handleSubmit}>
        
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.name} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isLoading ? 'Adding...' : 'Add Transaction'}
        </motion.button>
      </form>
    </div>
  );
}