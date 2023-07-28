import React from "react";
import styles from "../styles/Vocabook.module.css";

const Vocabook = () => {
  return (
    <body className={styles.invocabookpage}>
      <div className={styles.lookButton}>
        <button className={styles.lookSentence}>
          <span>문장 보기</span>
        </button>
        <button className={styles.lookVoca}>
          <span>단어 보기</span>
        </button>
      </div>

      <div className={styles.invocabook}>
        <div className={styles.header}>
          <h1>
            기본 단어장<span className={styles.numberVoca}>(8)</span>
          </h1>
        </div>
        <div className={styles.topLine}></div>
        <div>
          <p className={styles.eng}>
            {" "}
            <span className={styles.numberSen}>1. </span>Do what you can, with
            what you have, where you are.
          </p>
          <p className={styles.kor}>
            당신이 할 수 있는 것을, 당신이 가진 것으로, 당신이 있는 곳에서
            하세요.
          </p>
        </div>
        <div className={styles.line}></div>
      </div>
    </body>
  );
};

export default Vocabook;
