import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function GuestRegister({ setAuth }) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
    guests_email: "",
  });

  let { guestsemail, guestsname } = useParams();

  guestsemail = atob(guestsemail);

  const { email, name, password } = inputs;

  const handleInput = e => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async e => {
    e.preventDefault();
    try {
      const body = { email, name, password, guestsemail, guestsname };
      const response = await fetch(
        `http://localhost:5000/auth/guest-register/${guestsemail}/${guestsname}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
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
            required
          ></input>
          <input
            className="form-control my-3"
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={handleInput}
            required
          ></input>
          <input
            className="form-control my-3"
            type="text"
            name="name"
            placeholder="your name"
            value={name}
            onChange={handleInput}
            required
          ></input>
          <input type="hidden" name="guest_name" value={guestsname}></input>
          <input type="hidden" name="guest_email" value={guestsemail}></input>
          <button className="btn btn-block btn-success">sign up</button>
        </form>
        <Link to="/login">Already have an account? Login</Link>
      </div>
    </>
  );
}
