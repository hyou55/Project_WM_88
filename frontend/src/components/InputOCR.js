import React, { useState } from "react";
import axios from "axios";

const InputOCR = () => {
  const [inputText, setInputText] = useState("");
  const [analysisResult, setAnalysisResult] = useState("");
  const [translatedResult, setTranslatedResult] = useState("");

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 백엔드로 영어 문장 전송
      const response = await axios.post("http://your-django-api-endpoint/", {
        sentence: inputText,
      });

      // 형태소 분석 결과와 번역된 결과 받아오기
      const { analysisResult, translatedResult } = response.data;
      setAnalysisResult(analysisResult);
      setTranslatedResult(translatedResult);
    } catch (error) {
      console.error("요청에 실패했습니다.", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputText} onChange={handleInputChange} />
        <button type="submit">분석 및 번역</button>
      </form>

      {analysisResult && (
        <div>
          <h3>형태소 분석 결과:</h3>
          <p>{analysisResult}</p>
        </div>
      )}

      {translatedResult && (
        <div>
          <h3>번역된 결과:</h3>
          <p>{translatedResult}</p>
        </div>
      )}
    </div>
  );
};

export default InputOCR;
