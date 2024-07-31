import React from 'react';
import { useState, useEffect } from 'react';
import './login.css';
import loginImage from './images/login.png'; 

const Login = () => {
  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsLogin(true);
  };
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isLogin) {
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters!";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters!";
    }
    return errors;
  };
  return (
    <div className='login'>
      <div className='login-bg'></div>
      <div className='container'>
        {Object.keys(formErrors).length === 0 && isLogin ? (
          <div className='success-message'>Login successfully</div>
        ) : (
          <pre></pre>
        )}
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <div className='ui divider'></div>
          <div className='ui-form'>
            <div className='field'>
              <label>Username</label>
              <input
                type='text'
                name='username'
                placeholder='Username'
                value={formValues.username}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.username}</p>
            <div className='field'>
              <label>Email</label>
              <input
                type='email'
                name='email'
                placeholder='Email'
                value={formValues.email}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.email}</p>
            <div className='field'>
              <label>Password</label>
              <input
                type='password'
                name='password'
                placeholder='Password'
                value={formValues.password}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.password}</p>
            <div className='additional-opt'>
              <input
                type='checkbox'
                name='rememberMe'
              />
              <div className='field-ex'>
                <label>Remember Me</label>
              </div>
              <a href='/forgot-password'>Forgot Password?</a>
            </div>
            <button className='btn'>Login</button>
            <div className='additional-options'>
              <a href='/register'>Haven't an account? Register here</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;



