import React, { useState } from "react";

export default function InputItem() {
  const [description, setDescription] = useState("");

  const handleUserInput = e => setDescription(e.target.value);

  const handleFormSubmit = async e => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch("http://localhost:5000/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(response);
      setDescription("");
      window.location = "/";
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
