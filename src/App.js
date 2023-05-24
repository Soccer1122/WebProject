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
function App() {
  return (
    <div className="App">
      <link rel="shortcut icon" href="images/favicon.ico" />
      <link rel="stylesheet" href="css/bootstrap.min.css" />
      <link rel="stylesheet" href="css/typography.css" />
      <link rel="stylesheet" href="css/style.css" />
      <link rel="stylesheet" href="css/responsive.css" />
      <Routes>
        <Route element={<Header/>}/>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/home/:id" element={<Book/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/admin" element={<Admin/>}/> 
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
