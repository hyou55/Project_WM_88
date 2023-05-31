//import logo from "./logo.svg";
//import GoogleLoginForm from "./GoogleLoginForm";
//import { BrowserRouter } from "react-router-dom";
import React from "react";
import GoogleLogin from "./GoogleLogin";
import "./App.css";

function App() {
  return (
    <div className="App">
      <GoogleLogin />
    </div>
  );
}

export default App;

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
