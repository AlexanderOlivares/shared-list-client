import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import emailjs from "emailjs-com";

export default function Login({ setAuth }) {
  const EMAILJS_USER_ID = process.env.REACT_APP_USER_ID;
  const EMAILJS_SERVICE_ID = process.env.REACT_APP_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_TEMPLATE_ID;

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [emailToResetPass, setEmailToResetPass] = useState("");

  const handlePasswordReset = e => {
    setEmailToResetPass(e.currentTarget.value);
  };

  const sendPasswordResetEmail = () => {
    let emailContent = {
      emailToResetPass,
    };

    // need to makea new templateID

    // emailjs
    //   .send(
    //     EMAILJS_SERVICE_ID,
    //     EMAILJS_TEMPLATE_ID,
    //     emailContent,
    //     EMAILJS_USER_ID
    //   )
    //   .then(
    //     result => {
    //       console.log(result.text);
    //       alert(
    //         "Password reset requested. Follow instuctions in email to reset your password."
    //       );
    //     },
    //     error => {
    //       console.log(error.text);
    //       alert("Error could not password reset send email.");
    //     }
    //   );
  };

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

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("successful login");
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
        <div className="d-flex mt-1 justify-content-around">
          <Link to="/register">Don't have an account? Sign up</Link>
          <button
            type="button"
            className="btn-sm btn-primary"
            data-toggle="modal"
            data-target="#exampleModal"
          >
            Forgot your passowrd?
          </button>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Reset Password
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div>
                <input
                  className="form-control"
                  type="email"
                  placeholder="you@email.com"
                  name="emailReset"
                  value={emailToResetPass}
                  onChange={handlePasswordReset}
                  required
                ></input>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={sendPasswordResetEmail}
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
              >
                Send password reset email
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
