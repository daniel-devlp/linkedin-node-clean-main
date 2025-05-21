import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../Api/Auth';

export const Home = () => {
  const [users, setUsers] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchUsers = async () => {
      try {
        const data = await AuthService.getUsers(token);
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users', error);
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    fetchUsers();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleLogout}>Logout</button>
      <h2>Users:</h2>
      <ul>
        <p>estas dentro del usuario</p>
      </ul>
    </div>
  );
};