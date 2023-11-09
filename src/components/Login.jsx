import { useState } from 'react';
import PropTypes from 'prop-types';

function Login({ setToken, setUser, setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://blog-api-production-7f4c.up.railway.app/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      const responseData = await response.json();
      console.log(responseData);
      console.log(response);
      if (response.status === 200) {
        setLoginError(null);
        setToken(responseData.token);
        setUser(responseData.user);
        setIsLoggedIn(true);
        setUsername('');
        setPassword('');
        localStorage.setItem('token', JSON.stringify(responseData.token));
        localStorage.setItem('user', JSON.stringify(responseData.user));
        localStorage.setItem('isLoggedIn', JSON.stringify(true));
        localStorage.setItem('createdAt', new Date().getTime());
      } else if (!response.ok) {
        setLoginError(responseData.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div onSubmit={handleLogin} className="login-page">
      <h2>Login</h2>
      <form className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        {loginError ? <p>{loginError}</p> : null}
      </form>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func,
  setUser: PropTypes.func,
  setIsLoggedIn: PropTypes.func,
};

export default Login;
