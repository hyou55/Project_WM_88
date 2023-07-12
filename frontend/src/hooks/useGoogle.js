// import { useState, useEffect } from "react";
// import qs from "qs";
// import axios from "axios";

// const AUTHORIZE_URI = "https://accounts.google.com/o/oauth2/v2/auth";

// const useGoogle = ({ clientId }) => {
//   const redirect_uri = "http://127.0.0.1:3000/login";
//   const loginQueryString = qs.stringify({
//     client_id: clientId,
//     redirect_uri,
//     response_type: "code", // code, token
//     scope: "https://www.googleapis.com/auth/userinfo.email",
//   });

//   useEffect(() => {
//     (async () => {
//       if (window.location.search.split("?").length > 1) {
//         console.log(window.location.search.split("?")[1]);
//         const { code, scope } = qs.parse(window.location.search.split("?")[1]);

//         console.log(code);
//         console.log(scope);

//         // TODO: 서버쪽 구현 후 주석 해제
//         // const { data } = await axios.get(`http://localhost:5500/login?code=${code}&redirect_uri=${redirect_uri}`);
//         // console.log(data)
//       } else if (window.location.search.split("#").length) {
//       }
//     })();
//   }, []);

//   return {
//     loginUrl: AUTHORIZE_URI + "?" + loginQueryString,
//   };
// };

// export default useGoogle;
