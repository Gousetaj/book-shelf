import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { getUser } from './../../utils/indexedDB';
import './Login.css'

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = await getUser(email);

    if (user && user.password === password) {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/');
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div className="main-div">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <Link to="/auth/signup">Sign Up Instead?</Link>
    </div>
  );
};

export default Login;
