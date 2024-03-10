import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function MyApp() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, []);

  const showItemDetails = (item) => {
    setSelectedItem(item);
  };

  const closeItemDetails = () => {
    setSelectedItem(null);
  };

  return (
    <div className="MyApp">
      <h1 className="my-title">Online Shop</h1>
      <div className="item-grid">
        {items.map((item) => (
          <div
            key={item.id}
            className="item"
            onClick={() => showItemDetails(item)}
          >
            <img src={item.image} alt={item.title} />
            <p>{item.title}</p>
          </div>
        ))}
      </div>
      {selectedItem && (
        <div className="item-details">
          <button onClick={closeItemDetails} className="button">
            Close
          </button>
          <h2>{selectedItem.title}</h2>
          <img src={selectedItem.image} alt={selectedItem.title} />
          <p>{selectedItem.description}</p>
          <p>Price: ${selectedItem.price}</p>
          <p>Category: {selectedItem.category}</p>
          <p>
            Rating: {selectedItem.rating.rate} ({selectedItem.rating.count}{" "}
            reviews)
          </p>
        </div>
      )}
    </div>
  );
}

export default MyApp;
