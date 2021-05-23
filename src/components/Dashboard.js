import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import InputItem from "./InputItem";
import ListItem from "./ListItem";
import emailjs from "emailjs-com";

export default function Dashboard({ setAuth }) {
  const EMAILJS_USER_ID = process.env.REACT_APP_USER_ID;
  const EMAILJS_SERVICE_ID = process.env.REACT_APP_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_TEMPLATE_ID;

  const [name, setName] = useState("");
  const [creatorEmail, setCreatorEmail] = useState("");
  const [allItems, setAllItems] = useState([]);
  const [itemWasChanged, setItemWasChanged] = useState(false);
  const [guestName, setGuestName] = useState(null);
  const [modalInput, setModalInput] = useState({
    name: "",
    email: "",
  });
  const [show, setShow] = useState(false);

  async function getName() {
    try {
      const response = await fetch(`http://localhost:5000/dashboard/`, {
        method: "GET",
        headers: {
          token: localStorage.token,
        },
      });

      const parseRes = await response.json();
      console.log(parseRes);

      setAllItems(parseRes);

      setName(`${parseRes[0].creator_name}`);
      setCreatorEmail(`${parseRes[0].creator}`);

      // setGuestName(`${parseRes[0].editors_name}`);
      setGuestName(parseRes[0].editors_name);
    } catch (err) {
      console.error(err.message);
    }
  }

  console.log(allItems);
  console.log(creatorEmail);

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

  const handleModalInput = e => {
    const { name, value } = e.target;
    setModalInput(prev => {
      return { ...prev, [name]: value };
    });
  };

  const handleFormSubmit = async e => {
    e.preventDefault();
    try {
      const { name: editors_name, email: editors } = modalInput;

      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", localStorage.token);

      let creator = creatorEmail;

      const body = {
        creator,
        editors_name,
        editors,
      };

      emailjs
        .sendForm(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          e.target,
          EMAILJS_USER_ID
        )
        .then(
          result => {
            console.log(result.text);
            alert("invitation was sent");
          },
          error => {
            console.log(error.text);
            alert("error could not send invite");
          }
        );

      console.log(JSON.stringify(body));
      await fetch(`http://localhost:5000/dashboard/invite`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(body),
      });

      setGuestName(editors_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  const joinNameWithDash = nameStr => {
    return nameStr.replace(/\s/g, "-");
  };

  return (
    <>
      <div className="d-flex mt-3 justify-content-around">
        {name && <h1>{name}</h1>}
        {/* {guestName !== null && <p>{guestName}</p>} */}
        <button className="btn btn-danger" onClick={e => logout(e)}>
          logout
        </button>
        {/* IF EDITORS NAME !== NULL THEN SHOW INVITE BUTTON */}
        {!guestName && (
          <button
            type="button"
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#exampleModal"
          >
            Invite editor
          </button>
        )}
      </div>
      <InputItem setItemWasChanged={setItemWasChanged} />
      <ListItem allItems={allItems} setItemWasChanged={setItemWasChanged} />
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
                Share this list with:
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
            {/* <form onSubmit={handleFormSubmit}> */}
            <form onSubmit={handleFormSubmit}>
              <div className="modal-body">
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  value={modalInput.name}
                  placeholder="editor's name"
                  onChange={handleModalInput}
                />
                <input
                  className="form-control"
                  name="email"
                  value={modalInput.email}
                  type="email"
                  placeholder="editors@email.com"
                  onChange={handleModalInput}
                />
                {/* joining name by dash as a test */}
                <input
                  type="hidden"
                  name="creator"
                  value={joinNameWithDash(name)}
                />
                <input type="hidden" name="creatorEmail" value={creatorEmail} />
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
                  type="submit"
                  className="btn btn-primary"
                  // data-dismiss="modal"
                >
                  Send invite
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
