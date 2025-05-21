import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../Api/Auth';
import './Login.css';

export const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const { token, user } = await AuthService.login(formData.email, formData.password);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/');
    } catch (err) {
      setError('Credenciales incorrectas o error de conexión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="loginBackground">
      <div className="loginContainer">
        <div className="loginHeader">
          <h1>Bienvenido</h1>
          <p>Ingresa tus credenciales para continuar</p>
        </div>
        
        {error && <div className="errorMessage">{error}</div>}

        <form onSubmit={handleSubmit} className="loginForm">
          <div className="formGroup">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ejemplo@correo.com"
              required
              className="inputField"
            />
          </div>
          
          <div className="formGroup">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="inputField"
            />
          </div>
          
          <button 
            type="submit" 
            className="submitButton"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="spinner"></span>
            ) : 'Iniciar sesión'}
          </button>
        </form>

        <div className="loginFooter">
          <p>¿No tienes cuenta? <a href="/register">Regístrate</a></p>
          <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
        </div>
      </div>
    </div>
  );
};