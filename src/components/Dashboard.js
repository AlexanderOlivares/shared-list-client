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

  async function getListItems() {
    try {
      const response = await fetch(`http://localhost:5000/dashboard/`, {
        method: "GET",
        headers: {
          token: localStorage.token,
        },
      });

      const parseRes = await response.json();

      setAllItems(parseRes);
    } catch (err) {
      console.error(err.message);
      // alert(`An error occured. Please refresh the browser.`);
    }
  }

  async function getUsernameAndEmail() {
    try {
      const response = await fetch(
        `http://localhost:5000/dashboard/name-email`,
        {
          method: "GET",
          headers: {
            token: localStorage.token,
          },
        }
      );

      const parseRes = await response.json();

      setName(parseRes[0].user_name);
      setCreatorEmail(parseRes[0].user_email);
      setGuestName(parseRes[0].guests_name);
    } catch (err) {
      console.error(err.message);
    }
  }

  console.log(allItems);
  console.log(creatorEmail);
  console.log(name);
  console.log(guestName);

  useEffect(() => {
    getUsernameAndEmail();
    getListItems();
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

  const joinNameWithDash = nameStr => {
    return nameStr.trim().replace(/\s/g, "-");
  };

  const handleFormSubmit = async e => {
    e.preventDefault();
    try {
      const { name: editors_name, email: editors } = modalInput;

      let creator = btoa(creatorEmail);
      let creatorNameNoDash = name;
      let creatorName = joinNameWithDash(name);

      // body obj is used for email params and put request
      const body = {
        creatorNameNoDash,
        creatorName,
        creator,
        editors_name,
        editors,
      };

      emailjs
        .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, body, EMAILJS_USER_ID)
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

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", localStorage.token);

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

  return (
    <>
      <div className="d-flex mt-3 justify-content-around">
        <button className="btn btn-danger" onClick={e => logout(e)}>
          logout
        </button>
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
      <InputItem
        name={name}
        guestName={guestName}
        setItemWasChanged={setItemWasChanged}
      />
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
            <form>
              <div className="modal-body">
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  value={modalInput.name}
                  placeholder="editor's name"
                  onChange={handleModalInput}
                  required
                />
                <input
                  className="form-control"
                  name="email"
                  value={modalInput.email}
                  type="email"
                  placeholder="editors@email.com"
                  onChange={handleModalInput}
                  required
                />
                {/* joining name by dash for use in url */}
                <input type="hidden" name="creator" value={name} />
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
                  onClick={handleFormSubmit}
                  className="btn btn-primary"
                  data-dismiss="modal"
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
