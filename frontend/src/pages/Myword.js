import React, { useState } from "react";
import styles from "../styles/Myword.module.css";
import { NavLink } from "react-router-dom";

const Myword = () => {
  return (
    <body>
        <h1>My 단어장</h1>
        <div>
          <NavLink to="/vocabook">
          <p className={styles.basicVoca}>기본 단어장</p>
          </NavLink>

          <p className={styles.basicVocaAdd}>+</p>
          {/* 모달창 만들어야함. 모드 변경>> 새 페이지 추가 */}

        </div>

        <NavLink to="/vocatest">
        <div className={styles.testButton}>
        <button className={styles.vocaTestButton}><span>단어TEST</span></button>
        </div>
        </NavLink>
        
        <div className={styles.line}></div>

        <div>
        <h1>스크랩북</h1>
        
        <NavLink to="/myword/scrapbook">
        <p className={styles.basicScrap}>기본 스크랩북</p>
        </NavLink>

        <p className={styles.basicScrapAdd}>+</p>
        {/* 모달창 만들어야함. 모드 변경>> 새 페이지 추가 */}
       
        </div>
    </body>
  );
};

export default Myword;