import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../Api/Auth';
import "./Register.css";


export const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
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
      await AuthService.register(formData.name, formData.email, formData.password);
      navigate('/login');
    } catch (err) {
      setError('Error en el registro. Por favor intenta nuevamente.');
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="registerBackground">
      <div className="registerContainer">
        <div className="registerHeader">
          <h1>Crea tu cuenta</h1>
          <p>Comienza tu experiencia con nosotros</p>
        </div>
        
        {error && <div className="errorMessage">{error}</div>}

        <form onSubmit={handleSubmit} className="registerForm">
          <div className="formGroup">
            <label htmlFor="name">Nombre completo</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej: Juan Pérez"
              required
              className="inputField"
            />
          </div>
          
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
              minLength={6}
              className="inputField"
            />
            <p className="passwordHint">Mínimo 6 caracteres</p>
          </div>
          
          <button 
            type="submit" 
            className="submitButton"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="spinner"></span>
            ) : 'Registrarse'}
          </button>
        </form>

        <div className="registerFooter">
          <p>¿Ya tienes cuenta? <a href="/login">Inicia sesión</a></p>
        </div>
      </div>
    </div>
  );
};