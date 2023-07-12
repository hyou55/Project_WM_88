import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Image from "./pages/Image";
import Keyword from "./pages/Keyword";
import Login from "./pages/Login";
import Myword from "./pages/Myword";
import Navbar from "./components/Navbar";
import "../src/App.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="image" element={<Image />}></Route>
        <Route path="keyword" element={<Keyword />}></Route>
        <Route path="myword" element={<Myword />}></Route>
        <Route path="main" element={<Main />}></Route>
      </Routes>
    </>
  );
}
export default App;