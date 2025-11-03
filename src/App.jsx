import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import axios from "axios";
import { Atom } from "react-loading-indicators";
import ModalCart from "./Pages/ModalCart";
import ProductsList from "./Pages/ProductsList";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  // store all products
  const [products, setProducts] = useState([]);

  // store items added to cart
  const [cartItems, setCartItems] = useState([]);

  // show or hide cart modal (saved in localStorage)
  const [model, setModel] = useState(() => {
    const saved = localStorage.getItem("model");
    return saved === "true";
  });

  // loading state for spinner
  const [loading, setLoading] = useState(true);

  // get saved cart items from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // save cart items in localStorage when updated
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // save modal state in localStorage
  // useEffect(() => {
  //   localStorage.setItem("model", model);
  // }, [model]);

  // fetch products when page loads
  useEffect(() => {
    fetchProducts();
  }, []);

  // function to get products from API
  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
    } catch (error) {
      console.log("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // remove item completely from cart
  const handleRemoveFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // increase quantity of an item
  const handleAddCount = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, count: (item.count ?? 1) + 1 } : item
      )
    );
  };

  // decrease quantity of an item
  const handleRemoveCount = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, count: (item.count ?? 1) - 1 } : item
        )
        .filter((item) => (item.count ?? 1) > 0)
    );
  };

  // add or remove product from cart
  const handleCartToggle = (product) => {
    if (cartItems.some((item) => item.id === product.id)) {
      setCartItems(cartItems.filter((item) => item.id !== product.id));
    } else {
      setCartItems([...cartItems, product]);
    }
  };

  // check if a product is in cart
  const isInCart = (id) => cartItems.some((item) => item.id === id);

  // show loading spinner while fetching
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Atom color="#32cd32" size="medium" text="" textColor="#32cd32" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      {/* Navbar with cart count and button to open modal */}
      <Navbar cartCount={cartItems.length} onCartClick={() => setModel(true)} />

      <Routes>
        {/* main product list page */}
        <Route
          path="/"
          element={
            <div className="container">
              <ProductsList
                products={products}
                onCartToggle={handleCartToggle}
                isInCart={isInCart}
              />
            </div>
          }
        />

        {/* cart modal page */}
        <Route
          path="/modal-cart"
          element={
            <ModalCart
              cartItems={cartItems}
              onHandleAdd={handleAddCount}
              onHandleRemove={handleRemoveCount}
              onRemove={handleRemoveFromCart}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
