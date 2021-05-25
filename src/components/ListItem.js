import React, { useState, useEffect } from "react";
import EditItem from "./EditItem";

export default function ListItem({ allItems, setItemWasChanged }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(allItems);
  }, [allItems]);

  async function deleteListItem(id) {
    try {
      await fetch(`http://localhost:5000/dashboard/items/${id}`, {
        method: "DELETE",
        headers: { token: localStorage.token },
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
            <th>Creator</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* if new user has no items yet this prevents rendering just an edit and delete button */}
          {items.length !== 0 &&
            items[0].item_id !== null &&
            items.map(item => {
              return (
                <tr key={item.item_id}>
                  <td>{item.description}</td>
                  <td>{item.creator_name.split(" ")[0]}</td>
                  <td>
                    <EditItem
                      item={item}
                      setItemWasChanged={setItemWasChanged}
                    />
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
