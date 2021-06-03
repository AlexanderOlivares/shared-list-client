import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import bg from "../assets/bg.jpeg";

const div1styles = {
  height: "100vh",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundImage: `url(${bg})`,
};

export default function Register({ setAuth }) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
    guests_email: "",
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

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("Successfully registered. Welcome!");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }

      console.log(parseRes);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div style={div1styles}>
      <div className="container">
        <h1 className="text-center p-4">Register</h1>
        <form
          className="text-center justify-content-center"
          onSubmit={handleFormSubmit}
        >
          <input
            data-aos="fade-left"
            data-aos-delay="500"
            className="form-control my-3 mx-auto col-xs-4 col-sm-8 col-md-5"
            type="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={handleInput}
          ></input>
          <input
            data-aos="fade-right"
            data-aos-delay="500"
            className="form-control my-3 mx-auto col-xs-4 col-sm-8 col-md-5"
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={handleInput}
          ></input>
          <input
            data-aos="fade-left"
            data-aos-delay="500"
            className="form-control my-3 mx-auto col-xs-4 col-sm-8 col-md-5"
            type="text"
            name="name"
            placeholder="your name"
            value={name}
            onChange={handleInput}
          ></input>
          <button
            data-aos="fade-right"
            data-aos-delay="500"
            className="btn btn-success form-control my-3 mx-1 col-xs-2 col-sm-4 col-md-5"
          >
            sign up
          </button>
        </form>
        <div
          data-aos="zoom-in"
          data-aos-delay="500"
          className="text-center mt-2 "
        >
          <Link to="/login">Already have an account? Login</Link>
        </div>
      </div>
    </div>
  );
}
