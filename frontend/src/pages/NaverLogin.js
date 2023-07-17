import React from "react";
import ReactDOM from "react-dom";
import { NaverLogin } from "react-naver-login";

ReactDOM.render(
  <NaverLogin
    clientId="sdffdNNFDSjsddiosd"
    callbackUrl="http://127.0.0.1:3000/login"
    render={(props) => <div onClick={props.onClick}>Naver Login</div>}
    onSuccess={(naverUser) => console.log(naverUser)}
    onFailure={() => console.error(result)}
  />,
  document.getElementById("root")
);
