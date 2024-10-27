import React from 'react';
import { motion } from 'framer-motion';
import { FaSun, FaMoon, FaUser, FaSignOutAlt } from 'react-icons/fa';
import './Header.css';

export default function Header({ darkMode, toggleDarkMode, setCurrentView, currentView, user, onLogout }) {
  return (
    <header className="header">
      <div className="container header-content">
        <h1 className="logo">Expense Tracker</h1>
        <nav className="nav-links">
          {user && (
            <>
              <motion.button
                className={`nav-button ${currentView === 'dashboard' ? 'active' : ''}`}
                onClick={() => setCurrentView('dashboard')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Dashboard
              </motion.button>
              <motion.button
                className={`nav-button ${currentView === 'transactions' ? 'active' : ''}`}
                onClick={() => setCurrentView('transactions')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Transactions
              </motion.button>
              <motion.button
                className={`nav-button ${currentView === 'categories' ? 'active' : ''}`}
                onClick={() => setCurrentView('categories')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Categories
              </motion.button>
            </>
          )}
        </nav>
        <div className="user-section">
          {user ? (
            <>
              <motion.button
                className={`nav-button ${currentView === 'profile' ? 'active' : ''}`}
                onClick={() => setCurrentView('profile')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaUser className="icon" /> {user.name}
              </motion.button>
              <motion.button
                className="nav-button"
                onClick={onLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaSignOutAlt className="icon" /> Logout
              </motion.button>
            </>
          ) : (
            <motion.button
              className="nav-button"
              onClick={() => setCurrentView('login')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>
          )}
          <motion.button
            onClick={toggleDarkMode}
            className="mode-toggle"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {darkMode ? <FaSun className="icon" /> : <FaMoon className="icon" />}
          </motion.button>
        </div>
      </div>
    </header>
  );
}