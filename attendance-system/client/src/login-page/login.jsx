import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import loginImage from './images/login.png';

const Login = () => {
  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [serverResponse, setServerResponse] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleLogin = async (e) => {     //Service function that handles the login process
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    setIsLogin(true);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch('http://localhost:4007/login', {   // REST API call to the server
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formValues),
        });
        const data = await response.json();
        setServerResponse(data);
        if (response.ok) {
          console.log('Login successful:', data);
          navigate('/home'); 
        } else {
          console.error('Login failed:', data);
        }
      } catch (error) {
        console.error('Error during login:', error);
        setServerResponse({ error: 'An error occurred. Please try again later.' });
      }
    }
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isLogin) {
      console.log(formValues);
    }
  }, [formErrors]);


// Validation part of username email and password

const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";  //Error if username is Empty
    }
    if (!values.email) {
      errors.email = "Email is required!";    //Error if Email is Empty
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!"; //Error if email format is invalid
    }

    if (!values.password) {
      errors.password = "Password is required!";   //Error if password is Empty
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters!";  // Error if password is less than 4 characters
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters!"; // Error if password is more than 10 characters
    }



    return errors;
  };

  return (
    <div className='login'>
      <div className='login-bg'></div>
      <div className='container'>
        {serverResponse && serverResponse.message && (
          <div className='success-message'>{serverResponse.message}</div>
        )}
        {serverResponse && serverResponse.error && (
          <div className='error-message'>{serverResponse.error}</div>
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




