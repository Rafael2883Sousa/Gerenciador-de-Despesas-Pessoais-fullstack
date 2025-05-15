import { useEffect, useState } from 'react';
import api from '../services/api';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ income: 0, expense: 0 });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [transactionsRes, summaryRes] = await Promise.all([
          api.get('/transactions'),
          api.get('/transactions/summary')
        ]);
        setTransactions(transactionsRes.data);
        setSummary(summaryRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const refreshTransactions = async () => {
    try {
      const res = await api.get('/transactions');
      setTransactions(res.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    refreshTransactions();
  }, []);

  return (
    <div>
      <h2>Monthly Summary</h2>
      <p>Income: {summary.income}</p>
      <p>Expenses: {summary.expense}</p>
      <p>Balance: {summary.income - summary.expense}</p>
      
      <TransactionForm onTransactionAdded={refreshTransactions} />
      <TransactionList 
        transactions={transactions} 
        onTransactionUpdated={refreshTransactions} 
      />
    </div>
    
  );
};