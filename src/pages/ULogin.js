import './ULogin.css';
import React, { useState,useEffect } from 'react';
import { useNavigate,  useLocation} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode';

const ULogin = () => {
    const [username, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const locationState = useLocation(); 


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}webusers/Login`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ username, password }),
            });
      
            const data = await response.json();
      
            if (response.ok) {
              toast.success('Login successful!');
              localStorage.setItem('token', data.token);
              const redirectTo = locationState.state?.from || '/';
              navigate(redirectTo);
            } else {
                toast.error(data.error || 'Login failed');
            }
          } catch (error) {
            toast.error('An error occurred. Please try again.');
          } finally {
            setLoading(false);
          }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
                <h2>Login</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <label>
                    Email:
                    <input
                        type="username"
                        value={username}
                        onChange={(e) => setEmail(e.target.value)}
                        
                        required
                        style={{ marginBottom: '10px', padding: '8px' }}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ marginBottom: '10px', padding: '8px' }}
                    />
                </label>
                <button type="submit" style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none' }}>
                {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default ULogin;