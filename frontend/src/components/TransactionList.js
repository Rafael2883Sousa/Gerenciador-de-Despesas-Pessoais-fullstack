import { useState, useEffect } from 'react';
import api from '../services/api';

const TransactionList = ({ transactions, onTransactionUpdated }) => {
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    type: '',
    amount: '',
    category: '',
    date: '',
    description: ''
  });

  const handleDelete = async (id) => {
    try {
      await api.delete(`/transactions/${id}`);
      onTransactionUpdated(); // Notifica o componente pai para atualizar a lista
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const handleEditClick = (transaction) => {
    setEditingId(transaction.id);
    setEditFormData({
      type: transaction.type,
      amount: transaction.amount,
      category: transaction.category,
      date: transaction.date.split('T')[0],
      description: transaction.description
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/transactions/${editingId}`, editFormData);
      onTransactionUpdated(); // Atualiza a lista
      setEditingId(null);
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="transaction-list">
      <h3>Histórico de Transações</h3>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction.id} className={transaction.type}>
            {editingId === transaction.id ? (
              <form onSubmit={handleEditSubmit}>
                <select
                  name="type"
                  value={editFormData.type}
                  onChange={handleEditChange}
                >
                  <option value="income">Receita</option>
                  <option value="expense">Despesa</option>
                </select>
                <input
                  type="number"
                  name="amount"
                  value={editFormData.amount}
                  onChange={handleEditChange}
                  step="0.01"
                  required
                />
                <input
                  type="text"
                  name="category"
                  value={editFormData.category}
                  onChange={handleEditChange}
                  required
                />
                <input
                  type="date"
                  name="date"
                  value={editFormData.date}
                  onChange={handleEditChange}
                  required
                />
                <button type="submit">Salvar</button>
                <button type="button" onClick={() => setEditingId(null)}>
                  Cancelar
                </button>
              </form>
            ) : (
              <>
                <span className="category">{transaction.category}</span>
                <span className="amount">
                  {formatCurrency(transaction.amount)}
                </span>
                <span className="date">
                  {new Date(transaction.date).toLocaleDateString()}
                </span>
                {transaction.description && (
                  <p className="description">{transaction.description}</p>
                )}
                <button onClick={() => handleEditClick(transaction)}>
                  Editar
                </button>
                <button onClick={() => handleDelete(transaction.id)}>
                  Excluir
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;