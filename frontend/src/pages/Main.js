import React, { useState } from "react";
import styles from "../styles/Main.module.css";
import axios from "axios";

const Main = () => {
  const [textValue, setTextValue] = useState("");
  const [resultValue1, setResultValue1] = useState("");
  const [morp, setMorp] = useState([]); // 초기값은 빈 배열로 설정
  //const [word, setWord] = useState([]); // 초기값은 빈 배열로 설정
  //const [sum, setsum] = useState([]); // 초기값은 빈 배열로 설정


  const handleSetValue = (e) => {
    setTextValue(e.target.value);
  };

  const clicked = () => {
    axios
      .post("http://127.0.0.1:8000/api/PAPAGO/", {
        text: textValue,
      })
      .then((response) => {
        const translatedText1 = response.data.translated_text;
        setResultValue1(translatedText1);
      })
      .catch((error) => {
        console.error(error);
        setResultValue1("번역 실패");
      });

      axios
      .post("http://127.0.0.1:8000/api/process_text/", {
        text: textValue,
      })
      .then((response) => {
        const nouns = response.data.nouns;
        const wordTrans = response.data.result;
        setMorp(nouns);
        //setWord(wordTrans);
        // for(let i = 0 ; i < nouns.length; i++) {
        //   setsum(nouns[i] + "    :    " + wordTrans[i]);
        // }
      })
      .catch((error) => {
        console.error(error);
        setMorp("형태소 분석 실패");
      });
  };
  return (
    <div className={styles.mainlayout}>
      <div className={styles.textposition1}>
        <h2>영어</h2>
      </div>
      <div className={styles.textposition2}>
        <h2>한국어</h2>
      </div>
      <div className={styles.blank0}>
        <hr />
      </div>
      <textarea
        className={styles.inputField}
        placeholder="번역할 내용을 입력하세요."
        value={textValue}
        onChange={handleSetValue}
      ></textarea>
      <button className={styles.button} onClick={clicked}>
        번역
      </button>
      <div className={styles.arrow1}></div>
      <div className={styles.arrow2}></div>
      <textarea
        className={styles.outputbox}
        placeholder="번역 결과"
        value={resultValue1}
        readOnly
      ></textarea>

      <div className={styles.blank1}>
        <h4>영어 단어 결과입니다.</h4>
        <h2>단어장에 추가하고 싶은 단어를 선택해주세요.</h2>
        <button className={styles.button2}>한국어 결과보기</button>
      </div>
      <div className={styles.blank2}>
      <textarea
        className={styles.outputbox}
        placeholder="형태소 분석 결과"
        value={Array.isArray(morp) ? morp.join("\n") : ""}
        readOnly
      ></textarea>
        <hr />
      </div>
      <div className={styles.blank3}>
        <hr />
      </div>
      <div className={styles.blank4}>
        <h5>저장할 폴더를 선택해주세요</h5>
        <img src={process.env.PUBLIC_URL + "/voca-img.png"} width="150px" />
        <button className={styles.button3}>저장</button>
      </div>
      <div className={styles.blank5}>
        <hr />
      </div>
    </div>
  );
};

export default Main;
