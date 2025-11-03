import React, { useState } from "react";

const ProductsList = ({ products, onCartToggle, isInCart }) => {
  // track which product description is expanded
  const [expanded, setExpanded] = useState({});

  // toggle read more / show less
  const handleToggle = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="product-container">
      {/* loop through all products */}
      {products.map((item) => {
        const inCart = isInCart(item.id); // check if product in cart
        const isExpanded = expanded[item.id]; // check if desc expanded

        return (
          <div key={item.id} className="card">
            <img src={item.image} alt={item.title} className="product-image" />

            <h3>{item.title}</h3>

            {/* product description with read more */}
            <div>
              <p className={`desc ${isExpanded ? "expanded" : "collapsed"}`}>
                {item.description}
              </p>
              <span className="read-more" onClick={() => handleToggle(item.id)}>
                {isExpanded ? "Show less" : "Read more"}
              </span>
            </div>

            <p className="price">$ {item.price}</p>

            <div className="rating">
              <p>
                Rating: <span>{item.rating.rate}</span>
              </p>
              <p>
                Count: <span>{item.rating.count}</span>
              </p>
            </div>

            {/* add/remove cart button */}
            <button
              className={`${inCart ? "remove-cart-btn" : "add-cart-btn"}`}
              onClick={() => onCartToggle(item)}
            >
              {inCart ? "Remove from Cart" : "Add to Cart"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsList;
