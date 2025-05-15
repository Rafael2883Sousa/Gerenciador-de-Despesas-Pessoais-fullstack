import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import './RegisterPage.css'; // Arquivo de estilos opcional

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Para logar automaticamente após o registro

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.username || !formData.password) {
      setError('Todos os campos são obrigatórios');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return false;
    }
    
    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return false;
    }
    
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // 1. Registra o usuário
      await api.post('/auth/register', {
        username: formData.username,
        password: formData.password
      });
      
      // 2. Faz login automaticamente
      await login(formData.username, formData.password);
      
      // 3. Redireciona para o dashboard
      navigate('/dashboard');
      
    } catch (err) {
      console.error('Registration failed:', err);
      setError(err.response?.data?.error || 'Erro no cadastro. Tente outro nome de usuário.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Criar Nova Conta</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="username">Nome de Usuário:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            autoComplete="username"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirme a Senha:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
          />
        </div>
        
        <button 
          type="submit" 
          disabled={isLoading}
          className="register-button"
        >
          {isLoading ? 'Registrando...' : 'Registrar'}
        </button>
      </form>
      
      <div className="login-link">
        Já tem uma conta? <a href="/login">Faça login</a>
      </div>
    </div>
  );
};

export default RegisterPage;