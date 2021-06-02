import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import bg from "../assets/bg.jpeg";
import bg5 from "../assets/bg5.jpeg";
import bg9 from "../assets/bg9.jpeg";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

let div1styles = {
  paddingTop: "40px",
  height: "100vh",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundImage: `url(${bg5})`,
};

let div2styles = {
  height: "100vh",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundImage: `url(${bg9})`,
};
export default function Landing() {
  return (
    <>
      <div style={div1styles}>
        <div className="d-flex px-4 mt-n4 justify-content-end">
          <Link to="/login" className="btn btn-primary mr-3">
            Login
          </Link>
          <Link to="/register" className="btn btn-primary">
            Register
          </Link>
        </div>
        <div
          data-aos="slide-left"
          data-aos-delay="200"
          className="display-4 pt-5 text-center"
        >
          Sidebar List
        </div>
        <div
          data-aos="slide-right"
          data-aos-delay="200"
          className="card mt-5 mx-auto text-center"
          style={{ width: "70%" }}
        >
          <img src={""} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Share Your Ideas</h5>
            <p className="card-text">
              Build a list to share with friend. Edit each others items.
            </p>
            <button className="btn btn-primary">Go somewhere</button>
          </div>
        </div>
      </div>
      <div data-aos="fade-left" data-aos-delay="100">
        <p>sliiiiiiiiiiide in please</p>
      </div>
      <div style={div2styles}>
        <div className="d-flex align-self-center" style={{ height: "80vh" }}>
          <div
            data-aos="slide-left"
            data-aos-delay="200"
            className="card m-auto text-center"
            style={{ width: "70%" }}
          >
            <img src={""} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Share Your Ideas</h5>
              <p className="card-text">
                Build a list to share with friend. Edit each others items.
              </p>
              <button className="btn btn-primary">Go somewhere</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
