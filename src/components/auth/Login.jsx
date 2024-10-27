import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Login.css';

export default function Login({ onLogin, setCurrentView }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would validate the user here
    onLogin({ name: 'User', email });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Login
        </motion.button>
      </form>
      <p>
        Don't have an account?{' '}
        <button onClick={() => setCurrentView('signup')}>Sign up</button>
      </p>
    </div>
  );
}