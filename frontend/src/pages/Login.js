import { useEffect } from "react";
import styles from "../styles/Login.module.css";
import axios from "axios";

const Login = ({ setGetToken, setUserInfo }) => {
  const { naver } = window;
  const NAVER_CLIENT_ID = "UtkDRCTFmyyXauUyocKH"; // 발급 받은 Client ID 입력
  const NAVER_CALLBACK_URL = "http://127.0.0.1:3000/main"; // 작성했던 Callback URL 입력

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: NAVER_CLIENT_ID,
      callbackUrl: NAVER_CALLBACK_URL,
      // 팝업창으로 로그인을 진행할 것인지?
      isPopup: false,
      // 버튼 타입 ( 색상, 타입, 크기 변경 가능 )
      loginButton: { color: "green", type: 3, height: 58 },
      callbackHandle: true,
    });
    naverLogin.init();

    // 선언된 naverLogin 을 이용하여 유저 (사용자) 정보를 불러오는데
    // 함수 내부에서 naverLogin을 선언하였기에 지역변수처리가 되어
    // userinfo 정보를 추출하는 것은 지역변수와 같은 함수에서 진행주어야한다.

    // 아래와 같이 로그인한 유저 ( 사용자 ) 정보를 직접 접근하여 추출가능하다.
    // 이때, 데이터는 첫 연동시 정보 동의한 데이터만 추출 가능하다.

    // 백엔드 개발자가 정보를 전달해준다면 아래 요기! 라고 작성된 부분까지는
    // 코드 생략이 가능하다.

    naverLogin.getLoginStatus(async function (status) {
      if (status) {
        // 아래처럼 선택하여 추출이 가능하고,
        const userid = naverLogin.user.getEmail();
        const username = naverLogin.user.getName();
        // 정보 전체를 아래처럼 state 에 저장하여 추출하여 사용가능하다.
        // setUserInfo(naverLogin.user)
      }
    });
    // 요기!
  };

  // 네이버 소셜 로그인 (네아로) 는 URL 에 엑세스 어스코드가 붙어서 전달된다.
  // 우선 아래와 같이 어스코드를 추출 할 수 있으며,
  // 3부에 작성 될 Redirect 페이지를 통해 빠르고, 깨끗하게 처리가 가능하다.

  const userAccessToken = () => {
    window.location.href.includes("access_token") && getToken();
  };

  const getToken = () => {
    const token = window.location.href.split("=")[1].split("&")[0];
    // console.log, alert 창을 통해 어스코드가 잘 추출 되는지 확인하자!

    // 이후 로컬 스토리지 또는 state에 저장하여 사용하자!
    localStorage.setItem("access_token", token);
    setGetToken(token);
  };

  //   // gpt) 사용자 정보 받아오는 토큰---------------------------------
  //   axios
  //     .get(`http://127.0.0.1:8000/api/endpoint?access_token=${token}`)
  //     //YOUR_BACKEND_API_ENDPOINT는 백서버의 /api URL경로를 입력
  //     // http://127.0.0.1:8000/api/endpoint
  //     .then((response) => {
  //       // 성공적으로 사용자 정보를 받아왔을 때 처리할 로직 작성
  //       const userData = response.data; // 받아온 사용자 정보

  //       // 데이터베이스에 사용자 정보 저장
  //       axios.post(YOUR_BACKEND_API_ENDPOINT, userData)
  //         .then(response => {
  //           console.log('사용자 정보가 성공적으로 저장되었습니다.');
  //         })
  //         .catch(error => {
  //           console.error('사용자 정보 저장에 실패했습니다.', error);
  //         });

  //     })
  //     .catch((error) => {
  //       console.error("사용자 정보를 가져오는데 실패했습니다.", error);
  //     });
  // };

  // // -------------------------------------

  // 화면 첫 렌더링이후 바로 실행하기 위해 useEffect 를 사용하였다.
  useEffect(() => {
    initializeNaverLogin();
    userAccessToken();
  }, []);

  const handleUserInfo = (userid, username) => {
    // 사용자 정보를 백엔드로 전달하는 로직
    const userData = { userid, username };
    axios
      .post("http://127.0.0.1:8000/admin/", userData)
      .then((response) => {
        console.log("사용자 정보가 성공적으로 전달되었습니다.");
      })
      .catch((error) => {
        console.error("사용자 정보 전달에 실패했습니다.", error);
      });
  };

  // ...

  // naverLogin.getLoginStatus(async function (status) {
  //   if (status) {
  //     const userid = naverLogin.user.getEmail();
  //     const username = naverLogin.user.getName();
  //     handleUserInfo(userid, username);
  //     // setUserInfo(naverLogin.user);
  //   }
  // });

  return (
    // 구현할 위치에 아래와 같이 코드를 입력해주어야 한다.
    // 태그에 id="naverIdLogin" 를 해주지 않으면 오류가 발생한다!
    // 이게 로그인 버튼 생성한 것임
    <div>
      <div className={styles.mainlayout} id="naverIdLogin" />
    </div>
    // 이거 위에 <div />이렇게 닫아놓고 왜 쓴거임 -> </div>
  );
};

export default Login;

//----------------------------------------
// import React, { useEffect, useState } from "react";
// import { useScript } from "../hooks";

// function Login() {
//   const status = useScript(
//     "https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js"
//   );
//   const [naverLogin, setNaverLogin] = useState(null);
//   const { naver } = window;

//   useEffect(() => {
//     if (status === "ready") {
//       const newNaverLogin = new naver.LoginWithNaverId({
//         clientId: "UtkDRCTFmyyXauUyocKH",
//         callbackUrl: "http://127.0.0.1:3000/login",
//         isPopup: false,
//         loginButton: {
//           color: "green",
//           type: 3,
//           height: 50,
//         },
//       });

//       newNaverLogin.init();
//     }
//   }, [status]);

//   //    useEffect(()=>{
//   //        if(naverLogin){
//   //            naverLogin.init()
//   //        }
//   //    },[naverLogin]);

//   return (
//     <>
//       <div id="naverIdLogin"> </div>
//     </>
//   );
// }

// export default Login;

//------------------------------------------

// const Login = () => {
//   return (
//     <div>
//       <h1>로그인</h1>
//     </div>
//   );
// };

// export default Login;
