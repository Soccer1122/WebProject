import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignIn from "./components/sign-in";
import React from "react";
import Home from "./components/home";
import Footer from "./components/footer";
import Book from "./components/book";
import SignUp from "./components/sign-up";
import Admin from "./components/admin";
import Header from "./components/header";
import Cart from "./components/cart";
import Checkout from "./components/checkout";
import History from "./components/history";
const App = () => {
  console.log(localStorage);
  return (
    <div className="App">
      <Routes>
        <Route element={<Header />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/" element={<Home />} />
        <Route path="/book/:id" element={<Book />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/cart/:id" element={<Cart />} />
        <Route path="/checkout" element ={<Checkout/>}></Route>
        <Route path="/history/:id" element={<History />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
