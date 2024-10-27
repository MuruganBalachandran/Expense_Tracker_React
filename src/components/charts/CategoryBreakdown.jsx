import React from 'react';
import { motion } from 'framer-motion';
import { categories } from '../../data/categories';
import './CategoryBreakdown.css';

export default function CategoryBreakdown({ transactions }) {
  const categoryTotals = transactions.reduce((acc, transaction) => {
    acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
    return acc;
  }, {});

  const sortedCategories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);

  const getCategoryColor = (categoryName) => {
    const category = categories.find(cat => cat.name === categoryName);
    return category ? category.color : '#78909C';
  };

  return (
    <div className="category-breakdown">
      <h2>Category Breakdown</h2>
      <ul>
        {sortedCategories.map(([category, total]) => (
          <motion.li
            key={category}
            className="category-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="category-name" style={{ backgroundColor: getCategoryColor(category) }}>
              {category}
            </span>
            <span className="category-total">${total.toFixed(2)}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}