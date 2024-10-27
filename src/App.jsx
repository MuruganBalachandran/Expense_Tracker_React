import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Dashboard from './components/dashboard/Dashboard';
import AddTransactionForm from './components/transactions/AddTransactionForm';
import TransactionList from './components/transactions/TransactionList';
import CategoryBreakdown from './components/charts/CategoryBreakdown';
import ExpenseChart from './components/charts/ExpenseChart';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import UserProfile from './components/user/UserProfile';
import './App.css';

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedTransactions = localStorage.getItem('transactions');
    const savedIncome = localStorage.getItem('income');
    const savedUser = localStorage.getItem('user');
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
    if (savedIncome) setIncome(parseFloat(savedIncome));
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedDarkMode) setDarkMode(JSON.parse(savedDarkMode));
  }, []);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
    localStorage.setItem('income', income.toString());
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (user) localStorage.setItem('user', JSON.stringify(user));
  }, [transactions, income, user, darkMode]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const addTransaction = async (transaction) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newTransaction = { ...transaction, id: Date.now() };
    setTransactions([...transactions, newTransaction]);
    setIsLoading(false);
  };

  const deleteTransaction = async (id) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setTransactions(transactions.filter(t => t.id !== id));
    setIsLoading(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const updateIncome = (newIncome) => {
    setIncome(newIncome);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  const handleSignup = (userData) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('login');
    localStorage.removeItem('user');
  };

  const renderView = () => {
    if (!user) {
      return currentView === 'login' ? (
        <Login onLogin={handleLogin} setCurrentView={setCurrentView} />
      ) : (
        <Signup onSignup={handleSignup} setCurrentView={setCurrentView} />
      );
    }

    switch (currentView) {
      case 'dashboard':
        return <Dashboard transactions={transactions} income={income} />;
      case 'transactions':
        return (
          <>
            <AddTransactionForm addTransaction={addTransaction} isLoading={isLoading} />
            <TransactionList transactions={transactions} deleteTransaction={deleteTransaction} isLoading={isLoading} />
          </>
        );
      case 'categories':
        return <CategoryBreakdown transactions={transactions} />;
      case 'profile':
        return <UserProfile user={user} updateIncome={updateIncome} income={income} />;
      default:
        return null;
    }
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <Header 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
        setCurrentView={setCurrentView} 
        currentView={currentView}
        user={user}
        onLogout={handleLogout}
      />
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}