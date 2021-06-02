import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function Landing() {
  return (
    <>
      <div className="jumbotron text-center">
        <h1>Sidebar List</h1>
        <p>A list app you can privately share with a friend.</p>
        <Link to="/login" className="btn btn-primary mr-3">
          Login
        </Link>
        <Link to="/register" className="btn btn-primary">
          Register
        </Link>
      </div>
      <div style={{ height: "100vh" }}>
        <div className="card mx-auto text-center" style={{ width: "75%" }}>
          <img src="..." class="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Share Your Ideas</h5>
            <p className="card-text">
              Build a list to share with friend. Edit each others items.
            </p>
            <button className="btn btn-primary">Go somewhere</button>
          </div>
        </div>
      </div>
    </>
  );
}
