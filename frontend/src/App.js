import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Image from "./pages/Image";
import Keyword from "./pages/Keyword";
import Login from "./pages/Login";
import Myword from "./pages/Myword";
import Navbar from "./components/Navbar";
import Vocabook from "./pages/Vocabook";
import Scrapbook from "./pages/Scrapbook";
import Vocatest from "./pages/Vocatest";


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
        <Route path="vocabook" element={<Vocabook />}></Route>
        <Route path="scrapbook" element={<Scrapbook />}></Route>
        <Route path="vocatest" element={<Vocatest />}></Route>
      </Routes>
    </>
  );
}

<<<<<<< HEAD
export default App;
=======
export default App;

// =======
// //import logo from "./logo.svg";
// //import GoogleLoginForm from "./GoogleLoginForm";
// //import { BrowserRouter } from "react-router-dom";
// import React from "react";
// import GoogleLogin from "./GoogleLogin";
// import "./App.css";

// function App() {
//   return (
//     <div className="App">
//       <GoogleLogin />
//     </div>
// >>>>>>> 4621dc9e81a9cd43971d6bb4a1f5c66f4a41a474
//   );
// }

// export default App;

// 원본 react 서버 화면
// <div className="App">
//   <header className="App-header">
//     <img src={logo} className="App-logo" alt="logo" />
//     <p>
//       Edit <code>src/App.js</code> and save to reload.
//     </p>
//     <a
//       className="App-link"
//       href="https://reactjs.org"
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//       Learn React
//     </a>
//   </header>
// </div>



>>>>>>> c4653a56c9f4a67aae9dc24281f967f2255f8776
