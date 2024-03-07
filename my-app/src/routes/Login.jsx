import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { config } from "../constants";

const Login = () => {
  const navigate = useNavigate();
  const url = config.url.API_URL;
  const [inputValue, setInputValue] = useState({
    name: "",
    password: "",
  });
  const { name, password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        url + "/api/login",
        {
          ...inputValue,
        },
        { withCredentials: true }
      ).then((res) => {
        if(res.data === true) navigate('/dashboard')
      })
    } catch (err) {
      console.log(err);
    }
    setInputValue({
      ...inputValue,
      name: "",
      password: "",
    });
  };

  return (
    <div className="form_container">
      <h2>Login Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">name</label>
          <input type="name" name="name" value={name} placeholder="Enter your name" onChange={handleOnChange} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password} placeholder="Enter your password" onChange={handleOnChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
