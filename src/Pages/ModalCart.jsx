import React from "react";

const ModalCart = ({ cartItems, onHandleAdd, onHandleRemove, onRemove }) => {
  // total number of different products
  const totalProducts = cartItems.length;

  // total quantity of all items
  const totalQuantity = cartItems.reduce(
    (acc, item) => acc + (item.count ?? 1),
    0
  );

  // total price for all items
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * (item.count ?? 1),
    0
  );

  return (
    <div className="modal-section">
      <h2>
        <img src="./src/assets/shopping-cart.png" alt="" height={"20px"} />
        Shopping Cart
        <img src="./src/assets/shopping-cart.png" alt="" height={"20px"} />
      </h2>

      {/* check if cart is empty */}
      {cartItems.length === 0 ? (
        <p>Your cart is empty🛒.</p>
      ) : (
        <>
          {/* list of cart items */}
          <div className="cart-items">
            {cartItems.map((item) => {
              const count = item.count ?? 1;
              const totalPrice = Number(item.price) * count || 0;

              return (
                <div key={item.id} className="cart-item">
                  {/* product info */}
                  <div className="card-info">
                    <img src={item.image} alt={item.title} />
                    <div className="cart-info">
                      <h4>{item.title}</h4>
                      <p>
                        Price: <span>${item.price}</span>
                      </p>
                    </div>
                  </div>

                  {/* quantity and total price */}
                  <div className="total-price">
                    <p>
                      Quantity: <span>{count}</span>
                    </p>
                    <p>
                      Total: <span>${totalPrice.toFixed(2)}</span>
                    </p>

                    {/* add / remove count buttons */}
                    <div className="inc-btn">
                      <button onClick={() => onHandleAdd(item.id)}>Add</button>
                      <button onClick={() => onHandleRemove(item.id)}>
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* remove item button */}
                  <div>
                    <button
                      className="remove-btn"
                      onClick={() => onRemove(item.id)}
                    >
                      Remove Item
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* cart summary details */}
          <hr />
          <div className="cart-summary">
            <h3>🧾 Cart Summary</h3>
            <p>
              Total Products: <strong>{totalProducts}</strong>
            </p>
            <p>
              Total Quantity: <strong>{totalQuantity}</strong>
            </p>
            <p>
              Total Amount: <strong>${totalAmount.toFixed(2)}</strong>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default ModalCart;
