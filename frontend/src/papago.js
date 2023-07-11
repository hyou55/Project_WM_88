// import "./Papago.css";
// import React, { useState } from "react";
// import axios from "axios";

// function Papago() {
//   const [textValue, setTextValue] = useState("");
//   const [resultValue, setResultValue] = useState("");

//   const handleSetValue = (e) => {
//     setTextValue(e.target.value);
//   };

//   const clicked = () => {
//     axios
//       .get("http://localhost:8000/", {
//         params: {
//           api: textValue,
//         },
//       })
//       .then((response) => setResultValue(response.data))
//       .catch((error) => console.error(error));
//   };

//   return (
//     <div className="papago">
//       <textarea
//         placeholder="번역할 내용을 입력하세요."
//         value={textValue}
//         onChange={(e) => handleSetValue(e)}
//       ></textarea>

//       <p>
//         <button onClick={clicked}>번역</button>
//       </p>

//       <textarea placeholder="번역 결과">{resultValue}</textarea>
//     </div>
//   );
// }

// export default Papago;

// import "./Papago.css";
// import React, { useState } from "react";
// import axios from "axios";

// function Papago() {
//   const [textValue, setTextValue] = useState("");
//   const [resultValue, setResultValue] = useState("");

//   const handleSetValue = (e) => {
//     setTextValue(e.target.value);
//   };

//   const clicked = () => {
//     axios
//       .post("https://127.0.0.1:8000/", {
//         text: textValue,
//         source_lang: "ko",
//         target_lang: "en",
//       })
//       .then((response) => setResultValue(response.data))
//       .catch((error) => console.error(error));
//   };

//   return (
//     <div className="papago">
//       <textarea
//         placeholder="번역할 내용을 입력하세요."
//         value={textValue}
//         onChange={(e) => handleSetValue(e)}
//       ></textarea>

//       <p>
//         <button onClick={clicked}>번역</button>
//       </p>

//       <textarea placeholder="번역 결과">{resultValue}</textarea>
//     </div>
//   );
// }

// export default Papago;
//////////////////////////////////////////////

// import "./Papago.css";
// import React, { useState } from "react";
// import axios from "axios";

// function Papago() {
//   const [textValue, setTextValue] = useState("");
//   const [resultValue, setResultValue] = useState("");

//   const handleSetValue = (e) => {
//     setTextValue(e.target.value);
//   };

//   const clicked = () => {
//     axios
//       .get("http://localhost:8000/", {
//         text: textValue,
//         source: "ko",
//         target: "en",
//       })
//       .then((response) => setResultValue(JSON.stringify(response.data)))
//       .catch((error) => console.error(error));
//   };

//   return (
//     <div className="papago">
      
//       <textarea
//         placeholder="번역할 내용을 입력하세요."
//         value={textValue}
//         onChange={(e) => handleSetValue(e)}
//       ></textarea>

//       <p>
//         <button onClick={clicked}>번역</button>
//       </p>

//       <textarea placeholder="번역 결과">{resultValue}</textarea>
//     </div>
//   );
// }

// export default Papago;





// Papago.js
// import "./Papago.css";
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Papago = () => {
//   const [inputText, setInputText] = useState('');
//   const [translatedText, setTranslatedText] = useState('');
//   const [csrfToken, setCsrfToken] = useState('');

//   useEffect(() => {
//     fetchCsrfToken();
//   }, []);

//   const fetchCsrfToken = async () => {
//     try {
//       const response = await axios.get('/api/get-csrf-token/');
//       if (response.status === 200) {
//         setCsrfToken(response.data.csrfToken);
//       }
//     } catch (error) {
//       console.error(error);
//       // Handle error
//     }
//   };

//   const translateText = async () => {
//     try {
//       const response = await axios.post('http://127.0.0.1:8000/', {
//         text: inputText,
//         source_lang: 'ko',
//         target_lang: 'en'
//       }, {
//         headers: {
//           'X-CSRFToken': csrfToken
//         },
//         withCredentials: true  // withCredentials 옵션 활성화
//       });

//       if (response.status === 200) {
//         const translation = response.data.translated_text;
//         setTranslatedText(translation);
//       } else {
//         throw new Error('Failed to translate text');
//       }
//     } catch (error) {
//       console.error(error);
//       // Handle error
//     }
//   };

//   return (
//     <div className="papago">
//       <textarea
//         placeholder="번역할 내용을 입력하세요." 
//         value={inputText} 
//         onChange={(e) => setInputText(e.target.value)} 
//         rows={5} />
//       <p></p>
//       <button onClick={translateText}>번역</button>
//       <p></p>
//       <div>
//         <textarea 
//           placeholder="번역 결과"
//           value={translatedText} 
//           readOnly rows={5} />
//       </div>
//     </div>
//   );
// };

// export default Papago;


import "./Papago.css";
import React, { useState } from "react";
import axios from "axios";

function Papago() {
  const [textValue, setTextValue] = useState("");
  const [resultValue, setResultValue] = useState("");

  const handleSetValue = (e) => {
    setTextValue(e.target.value);
  };

  const clicked = () => {
    axios
      .post("http://127.0.0.1:8000", {
        text: textValue,
      })
      .then((response) => {
        const translatedText = response.data.translated_text;
        setResultValue(translatedText);
      })
      .catch((error) => {
        console.error(error);
        setResultValue("번역 실패");
      });
  };

  return (
    <div className="papago">
      <textarea
        placeholder="번역할 내용을 입력하세요."
        value={textValue}
        onChange={handleSetValue}
      ></textarea>
      <button onClick={clicked}>번역</button>
      <textarea
        placeholder="번역 결과"
        value={resultValue}
        readOnly
      ></textarea>
    </div>
  );
}

export default Papago;