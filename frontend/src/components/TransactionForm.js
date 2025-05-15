import { useState, useEffect } from 'react';
import api from '../services/api';

const TransactionForm = ({ onTransactionAdded }) => {
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0], // Data atual
    description: ''
  });

  const categories = {
    income: ['Salário', 'Freelance', 'Investimentos'],
    expense: ['Alimentação', 'Transporte', 'Lazer']
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/transactions', formData);
      onTransactionAdded(response.data);
      setFormData({
        type: 'expense',
        amount: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        description: ''
      });
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <div>
        <label>
          Tipo:
          <select 
            name="type" 
            value={formData.type}
            onChange={handleChange}
          >
            <option value="income">Receita</option>
            <option value="expense">Despesa</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Valor:
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
          />
        </label>
      </div>

      <div>
        <label>
          Categoria:
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Selecione...</option>
            {categories[formData.type].map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <label>
          Data:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Descrição (opcional):
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
      </div>

      <button type="submit">Adicionar Transação</button>
    </form>
  );
};

export default TransactionForm;