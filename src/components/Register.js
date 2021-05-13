import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Register({ setAuth }) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
  });

  const { email, name, password } = inputs;

  const handleInput = e => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async e => {
    e.preventDefault();
    try {
      const body = { email, name, password };
      const response = await fetch(`http://localhost:5000/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();

      localStorage.setItem("token", parseRes.token);
      setAuth(true);
      console.log(parseRes);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <div className="container">
        <h1 className="text-center my-5">Register</h1>
        <form onSubmit={handleFormSubmit}>
          <input
            className="form-control my-3"
            type="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={handleInput}
          ></input>
          <input
            className="form-control my-3"
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={handleInput}
          ></input>
          <input
            className="form-control my-3"
            type="text"
            name="name"
            placeholder="your name"
            value={name}
            onChange={handleInput}
          ></input>
          <button className="btn btn-block btn-success">sign up</button>
        </form>
        <Link to="/login">Already have an account? Login</Link>
      </div>
    </>
  );
}
