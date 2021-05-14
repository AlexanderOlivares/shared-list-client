import React, { useState } from "react";

export default function InputItem({ setItemWasChanged }) {
  const [description, setDescription] = useState("");

  const handleUserInput = e => setDescription(e.target.value);

  const handleFormSubmit = async e => {
    e.preventDefault();
    try {
      const body = { description };

      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", localStorage.token);

      const response = await fetch("http://localhost:5000/dashboard/items", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      });

      const parseResponse = await response.json();
      console.log(parseResponse);
      setItemWasChanged(true);
      setDescription("");
      // window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <h1 className="display-4 text-center my-5">Our List</h1>
      <form className="d-flex" onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="add item"
          className="form-control"
          value={description}
          onChange={handleUserInput}
        ></input>
        <button className="btn btn-success">add</button>
      </form>
    </>
  );
}
