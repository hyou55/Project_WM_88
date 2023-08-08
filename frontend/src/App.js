import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Image from "./pages/Image";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";


import "../src/App.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="image" element={<Image />}></Route>
        <Route path="main" element={<Main />}></Route>
      </Routes>
    </>
  );
}


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



