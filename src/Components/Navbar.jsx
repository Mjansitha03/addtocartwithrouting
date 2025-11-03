import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { BiSolidLeaf } from "react-icons/bi";
import { Link } from "react-router-dom";

const Navbar = ({ cartCount, onCartClick }) => {
  return (
    // top navigation bar
    <nav className="navbar">
      {/* logo with link to home */}
      <Link to="/">
        <h2 className="logo">
          Greeny Shop
          <BiSolidLeaf />
        </h2>
      </Link>

      {/* cart icon section */}
      <div className="cart-section" onClick={onCartClick}>
        {/* link to cart modal */}
        <Link to="modal-cart">
          <button className="shop-cart">
            <FaShoppingCart />
          </button>
        </Link>

        {/* show number of items in cart */}
        <div className="cart-count">{cartCount}</div>
      </div>
    </nav>
  );
};

export default Navbar;
