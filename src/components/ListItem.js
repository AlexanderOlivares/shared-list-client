import React, { useState, useEffect } from "react";
import EditItem from "./EditItem";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

const itemStyle = {
  overflow: "scroll",
  backdropFilter: "blur(10px), brightness(100%), greyscale(10%)",
};

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
    <div>
      {items.length !== 0 && items[0].item_id !== null && (
        <table className="mx-auto mt-5 text-dark">
          <thead className="thead-light">
            <tr className="p-1 m-2">
              <th>Item</th>
              <th>Edit</th>
              <th>Delete</th>
              <th>Creator</th>
            </tr>
          </thead>
          <tbody>
            {/* if new user has no items yet this prevents rendering just an edit and delete button */}
            {items.map(item => {
              return (
                <tr key={item.item_id}>
                  <td className="p-1 m-2">{item.description}</td>
                  <td className="p-1 m-2">
                    <EditItem
                      item={item}
                      setItemWasChanged={setItemWasChanged}
                    />
                  </td>
                  <td className="p-1 m-2">
                    <button
                      className="btn-sm btn-danger"
                      onClick={() => deleteListItem(item.item_id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td className="pl-3 m-2">
                    {item.creator_name.split(" ")[0]}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
