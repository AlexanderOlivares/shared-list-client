import React, { useState, useEffect } from "react";
import EditItem from "./EditItem";

export default function ListItem() {
  const [items, setItems] = useState([]);

  async function getItems() {
    const res = await fetch(`http://localhost:5000/items`);
    let listItemArray = await res.json();
    console.log(listItemArray);
    setItems(listItemArray);
  }

  useEffect(() => {
    getItems();
  }, []);

  async function deleteListItem(id) {
    try {
      await fetch(`http://localhost:5000/items/${id}`, {
        method: "DELETE",
      });

      setItems(items.filter(item => item.item_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <>
      <table className="mx-auto mt-5">
        <thead>
          <tr>
            <th>Item</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => {
            return (
              <tr key={item.item_id}>
                <td>{item.description}</td>
                <td>
                  <EditItem item={item} />
                </td>
                <td>
                  <button
                    className="btn-sm btn-danger"
                    onClick={() => deleteListItem(item.item_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
