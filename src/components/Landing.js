import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="jumbotron mt-5">
      <h1>Our List</h1>
      <p>A private list you can share with a friend. Sign in</p>
      <Link to="/login" className="btn btn-primary mr-3">
        Login
      </Link>
      <Link to="/register" className="btn btn-primary">
        Register
      </Link>
    </div>
  );
}
