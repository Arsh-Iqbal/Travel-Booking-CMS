import React, { useState } from 'react';
import axios from 'axios';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      dispatch(signInStart());
      
      // Use axios to send the request
      const res = await axios.post('http://localhost:5000/api/auth/signin', formData);
      
      if (res.data.success === false) {
        dispatch(signInFailure(res.data.message));
      } else {
        dispatch(signInSuccess(res.data));
        navigate('/');
      }
    } catch (error) {
      // Handle errors received from Axios
      dispatch(signInFailure(error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signin</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Signin</button>
    </form>
  );
};

export default Signin;
