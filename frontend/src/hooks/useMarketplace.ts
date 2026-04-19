import { useState, useEffect } from 'react';

interface Transaction {
  id: string;
  type: 'purchase' | 'sale';
  description: string;
  amount: number;
  timestamp: number;
}

const STORAGE_KEY = 'carbontrack_marketplace';
const INITIAL_BALANCE = 250;

export function useMarketplace() {
  const [balance, setBalance] = useState(INITIAL_BALANCE);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      setBalance(data.balance || INITIAL_BALANCE);
      setTransactions(data.transactions || []);
    }
  }, []);

  const saveToStorage = (newBalance: number, newTransactions: Transaction[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      balance: newBalance,
      transactions: newTransactions,
    }));
  };

  const purchaseItem = (cost: number, description: string): boolean => {
    if (balance < cost) {
      return false;
    }

    const newBalance = balance - cost;
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'purchase',
      description,
      amount: cost,
      timestamp: Date.now(),
    };

    const newTransactions = [newTransaction, ...transactions];
    setBalance(newBalance);
    setTransactions(newTransactions);
    saveToStorage(newBalance, newTransactions);

    return true;
  };

  const sellCredits = (amount: number) => {
    const newBalance = balance + amount;
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'sale',
      description: 'Sold credits to companies',
      amount,
      timestamp: Date.now(),
    };

    const newTransactions = [newTransaction, ...transactions];
    setBalance(newBalance);
    setTransactions(newTransactions);
    saveToStorage(newBalance, newTransactions);
  };

  return {
    balance,
    transactions,
    purchaseItem,
    sellCredits,
  };
}
