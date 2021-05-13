import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login({ setAuth }) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const handleInput = e => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async e => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch(`http://localhost:5000/auth/login`, {
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
        <h1 className="text-center my-5">Login</h1>
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
          <button className="btn btn-block btn-success">login</button>
        </form>
        <Link to="/register">Don't have an account? Sign up</Link>
      </div>
    </>
  );
}
