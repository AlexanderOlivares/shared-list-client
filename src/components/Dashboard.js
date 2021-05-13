import React, { useState, useEffect } from "react";

export default function Dashboard({ setAuth }) {
  const [name, setName] = useState("");

  async function getName() {
    try {
      const response = await fetch(`http://localhost:5000/dashboard`, {
        method: "GET",
        headers: {
          token: localStorage.token,
        },
      });

      const parseRes = await response.json();
      console.log(parseRes);
      setName(parseRes.user_name);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getName();
  }, []);

  const logout = e => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  };

  return (
    <>
      <h1>Dashboard {name}</h1>
      <button className="btn btn-danger" onClick={e => logout(e)}>
        logout
      </button>
    </>
  );
}
