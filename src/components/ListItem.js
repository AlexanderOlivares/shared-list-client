import React, { useState, useEffect } from "react";

export default function ListItem() {
  const [items, setItems] = useState([]);

  async function getItems() {
    const res = await fetch(`http://localhost:5000/items`);
    let listItemArray = await res.json();
    setItems(listItemArray);
  }

  console.log(items);

  useEffect(() => {
    getItems();
  }, []);

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
          {/* <tr>
            <td>Jill</td>
            <td>Smith</td>
            <td>50</td>
          </tr> */}
          {items.map(item => {
            return (
              <tr>
                <td>{item.description}</td>
                <td>
                  <button className="btn-sm btn-warning">Edit</button>
                </td>
                <td>
                  <button className="btn-sm btn-danger">Edit</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
