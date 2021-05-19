import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import InputItem from "./InputItem";
import ListItem from "./ListItem";

export default function Dashboard({ setAuth }) {
  const [name, setName] = useState("");
  const [allItems, setAllItems] = useState([]);
  const [itemWasChanged, setItemWasChanged] = useState(false);

  async function getName() {
    try {
      const response = await fetch(`http://localhost:5000/dashboard/`, {
        method: "GET",
        headers: {
          token: localStorage.token,
        },
      });

      const parseRes = await response.json();

      setAllItems(parseRes);

      setName(parseRes[0].user_name);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getName();
    setItemWasChanged(false);
  }, [itemWasChanged]);

  const logout = e => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Successful logout");
  };

  return (
    <>
      <div className="d-flex mt-3 justify-content-around">
        <h1>Welcome {name}</h1>
        <button className="btn btn-danger" onClick={e => logout(e)}>
          logout
        </button>
        <button className="btn btn-primary">Invite editor</button>
      </div>
      <InputItem setItemWasChanged={setItemWasChanged} />
      <ListItem allItems={allItems} setItemWasChanged={setItemWasChanged} />
    </>
  );
}
