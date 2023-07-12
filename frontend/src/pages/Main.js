import React from 'react';
import styles from '../styles/Main.module.css';

const Main = () => {
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
      <input className={styles.inputField}></input>
        <button className={styles.button}>번역</button>
      <div className={styles.arrow1}></div>
      <div className={styles.arrow2}></div>
      <div class={styles.outputbox}></div>
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