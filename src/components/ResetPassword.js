import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Redirect } from "react-router-dom";
import Loader from "react-loader-spinner";
import { toast } from "react-toastify";
import bg from "../assets/bg.jpeg";
import { globalStyles } from "./GlobalStyles";
import useMediaQuery from "./useMediaQuery";
import bg13 from "../assets/bg13.jpeg";

export default function ResetPassword({ setAuth }) {
  const mobileViewPort = useMediaQuery("(max-width: 500px)");

  const styles = {
    ...globalStyles,
    backgroundImage: mobileViewPort ? `url(${bg13})` : `url(${bg})`,
  };

  const { id, token } = useParams();

  const [input, setInput] = useState({
    password: "",
    conifrmPassword: "",
  });

  const [render, setRender] = useState(false);
  const [loading, setLoading] = useState(true);

  const validateToken = async () => {
    try {
      const isValidToken = await fetch(
        `http://localhost:5000/resetpassword/${id}/${token}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const validToken = await isValidToken.json();
      if (validToken) {
        setRender(true);
        setLoading(false);
      } else {
        toast.error(
          "Your one-time password reset link has timed out. Please request a new link."
        );
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error.message);
    }
  };

  useEffect(() => {
    validateToken();
  }, []);

  const handleInput = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const { password, confirmPassword } = input;

  const submitPasswordReset = async e => {
    e.preventDefault();
    const body = { password, confirmPassword };
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const updatePassword = await fetch(
        `http://localhost:5000/resetpassword/${id}/${token}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      const response = await updatePassword.json();
      if (response) {
        toast.success("Password updated. Please log in.");
        setRender(false);
      }
    } catch (error) {
      toast.error("Could not update password. Please request a new reset link");
      setRender(false);
    }
  };

  return (
    <div style={styles}>
      {loading ? (
        <div>
          <Loader type="ThreeDots" color="#00adb5" height={50} width={50} />
        </div>
      ) : render ? (
        <>
          <h1 className="text-center my-5">Reset Password</h1>
          <form onSubmit={submitPasswordReset}>
            <input
              className="form-control my-2 mx-auto col-xs-4 col-sm-8 col-md-5"
              type="password"
              name="password"
              placeholder="new password"
              value={password}
              onChange={handleInput}
            ></input>
            <input
              className="form-control my-2 mx-auto col-xs-4 col-sm-8 col-md-5"
              type="password"
              name="confirmPassword"
              placeholder="confirm password"
              value={confirmPassword}
              onChange={handleInput}
            ></input>
            <div className="text-center mt-2">
              <button className="btn btn-success form-control my-3 mx-1 col-xs-2 col-sm-4 col-md-5">
                Reset Password
              </button>
            </div>
          </form>
        </>
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
}
