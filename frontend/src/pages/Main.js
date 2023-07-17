import React, { useState }  from 'react';
import styles from '../styles/Main.module.css';
import axios from "axios";

const Main = () => {
  const [textValue, setTextValue] = useState("");
  const [resultValue, setResultValue] = useState("");

  const handleSetValue = (e) => {
    setTextValue(e.target.value);
  };

  const clicked = () => {
    axios
      .post("http://127.0.0.1:8000/PAPAGO/api/", {
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
      <textarea className={styles.inputField} 
        placeholder="번역할 내용을 입력하세요."
        value={textValue}
        onChange={handleSetValue}
      ></textarea>
        <button className={styles.button} onClick={clicked} >번역</button>
      <div className={styles.arrow1}></div>
      <div className={styles.arrow2}></div>
      <textarea class={styles.outputbox} 
        placeholder="번역 결과"
        value={resultValue}
        readOnly></textarea>
      <div className={styles.blank1}>
        <h4>영어 단어 결과입니다.</h4>
        <h2>단어장에 추가하고 싶은 단어를 선택해주세요.</h2>
        <button className={styles.button2}>한국어 결과보기</button>
      </div>
      <div className={styles.blank2}>
        <hr />
      </div>
      <div className={styles.blank3}>
        <hr />
      </div>
      <div className={styles.blank4}>
        <h5>저장할 폴더를 선택해주세요</h5>
        <img src={process.env.PUBLIC_URL + '/voca-img.png'} width = '150px'/>
        <button className={styles.button3}>저장</button>
      </div>
      <div className={styles.blank5}>
        <hr />
      </div>
    </div>
  );
};




export default Main;