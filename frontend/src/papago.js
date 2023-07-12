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
      .post("http://127.0.0.1:8000/", {
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