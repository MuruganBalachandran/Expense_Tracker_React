import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './UserProfile.css';

export default function UserProfile({ user, updateIncome, income }) {
  const [newIncome, setNewIncome] = useState(income);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateIncome(parseFloat(newIncome));
  };

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="income">Monthly Income:</label>
        <input
          type="number"
          id="income"
          value={newIncome}
          onChange={(e) => setNewIncome(e.target.value)}
          required
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Update Income
        </motion.button>
      </form>
    </div>
  );
}