import React, { useState } from "react";
import styles from "../styles/Main.module.css";
import axios from "axios";

const Main = () => {
  const [textValue, setTextValue] = useState("");
  const [resultValue1, setResultValue1] = useState("");
  const [morp, setMorp] = useState([]); // 형태소 분석된 것들의 리스트
  const [words, setWords] = useState([]); // 형태소 사전 검색한 것들의 리스트(사전 검색의 전체 문장이 들어있음)
  const [word, setWord] = useState([]); // 형태소 사전 검색한 것들의 리스트(사전 검색 안에서 또 개별 단어가 리스트화 됨)
  const handleSetValue = (e) => {
    setTextValue(e.target.value);
  };

  const clicked = async () => {
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
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/process_text/", {
          text: textValue,
        });
    
        const nouns = response.data.nouns;
    
        // 형태소 분석 결과를 words 상태로 업데이트
        setWords(nouns.map((word) => [word, ""]));
    
        // 형태소 분석 결과를 morp 상태로 업데이트
        setMorp(nouns);
    
        // 형태소 사전 검색 호출
        const results = [];
        for (const item of nouns) {
          let dict = ""; // 사전 검색 결과를 담을 변수
          while (dict === "") { // 사전 검색 결과가 빈 문자열일 경우 계속해서 사전 검색 수행
            try {
              dict = await searchDictionary(item);
            } catch (error) {
              console.error(error);
              dict = "형태소 사전 검색 실패";
            }
          }
    
          // words 배열의 각 항목에 형태소와 사전 검색 결과를 할당
          setWords((prevWords) =>
            prevWords.map((word) => {
              if (word[0] === item) {
                return [item, dict];
              }
              return word;
            })
          );
    
          results.push(dict);
        }
      } catch (error) {
        console.error(error);
        setMorp(["형태소 분석 실패"]);
      }
    }
    
    // const mor_Clicked = async () => {
    //   try {
    //     const response = await axios.post("http://127.0.0.1:8000/api/process_text/", {
    //       text: "Ukraine war is spurring a revolution in drone warfare using artificial intelligence",
    //       // text: "Chinese audiences are gravitating toward movies made at home, rather than in Hollywood",
    //     });
    
    //     const nouns = response.data.nouns;
    
    //     // 형태소 분석 결과를 words 상태로 업데이트
    //     setWords(nouns.map((word) => [word, ""]));
    
    //     // 형태소 분석 결과를 morp 상태로 업데이트
    //     setMorp(nouns);
    //   } catch (error) {
    //     console.error(error);
    //     setMorp(["형태소 분석 실패"]);
    //   }
    // };
  
    // const diction_Clicked = async () => {
    //   // 형태소 분석 호출
    //   try {
    //     const response = await axios.post("http://127.0.0.1:8000/api/process_text/", {
    //       text: textValue,
    //     });
    
    //     const nouns = response.data.nouns;
    
    //     // 형태소 분석 결과를 words 상태로 업데이트
    //     setWords(nouns.map((word) => [word, ""]));
    
    //     // 형태소 분석 결과를 morp 상태로 업데이트
    //     setMorp(nouns);
    
    //     // 형태소 사전 검색 호출
    //     const results = [];
    //     for (const item of nouns) {
    //       let dict = ""; // 사전 검색 결과를 담을 변수
    //       while (dict === "") { // 사전 검색 결과가 빈 문자열일 경우 계속해서 사전 검색 수행
    //         try {
    //           dict = await searchDictionary(item);
    //         } catch (error) {
    //           console.error(error);
    //           dict = "형태소 사전 검색 실패";
    //         }
    //       }
    
    //       // words 배열의 각 항목에 형태소와 사전 검색 결과를 할당
    //       setWords((prevWords) =>
    //         prevWords.map((word) => {
    //           if (word[0] === item) {
    //             return [item, dict];
    //           }
    //           return word;
    //         })
    //       );
    
    //       results.push(dict);
    //     }
    //   } catch (error) {
    //     console.error(error);
    //     setMorp(["형태소 분석 실패"]);
    //   }
    // };



      // words를 쪼개서 word 리스트에 저장하는 작업
      // const newWord = [];
      // for (const wordItem of results) {
      //   const sentences = wordItem[0].split(", "); // ", "를 기준으로 문장을 나눔
      //   const sentenceList = sentences.map((sentence) => sentence.trim()); // 각 문장 앞뒤의 공백을 제거하고 리스트에 추가
      //   newWord.push(sentenceList); // 각각의 sentenceList를 newWord 리스트에 추가
      // }
      // setWord(newWord);

  
    // 형태소 사전 검색 호출
    const searchDictionary = (morp) => {
      return axios
        .post("http://127.0.0.1:8000/api/Dictionary/", {
          text: morp,
        })
        .then((response) => {
          const dict = response.data.result; // 형태소 사전 검색 결과 추출
          return dict;
        })
        .catch((error) => {
          console.error(error);
          throw new Error("형태소 사전 검색 실패");
        });
    };

    return (
      <div className={styles.mainlayout}>
        <div className={styles.translatedBox}>
          <div className={styles.left}>
            <h2>영어</h2>
            <div className={styles.textposition1}>  
              <textarea className={styles.inputField} 
              placeholder="번역할 내용을 입력하세요."
              value={textValue}
              
              onChange={handleSetValue}
            ></textarea>
            <hr></hr>
            <button className={styles.button} onClick={clicked}>번역</button>
            </div>
          </div>
          
          {/* <div className={styles.arrow}></div> */}
  
          <div className={styles.right}>
            <h2>한국어</h2>
            <div className={styles.textposition2}>
              <textarea class={styles.outputField} 
              placeholder="번역 결과"
              value={resultValue1}
              readOnly>
                
              </textarea>
            </div>
          </div>
        </div>
        
        <div className={styles.resultBox}>
          <h4>문장 분석 결과입니다.</h4>
          <h2>단어장에 추가하고 싶은 단어를 선택해주세요.</h2>
          {/* <button className={styles.button2_1} onClick={mor_Clicked}>형태소 분석하기</button>
          <button className={styles.button2_2} onClick={diction_Clicked}>한국어 결과보기</button> */}
        </div>
        
        {/* <div className={styles.wordSave}>
          <h5>저장할 폴더를 선택해주세요</h5>
          <button className={styles.button3}>저장</button>
          <hr></hr>
          <p className={styles.saveVocaAdd}>단어장A</p>
          
        </div> */}
        <div className={styles.morphemeBox}>
          <textarea className={styles.outputbox}
             placeholder="형태소 분석 및 사전 검색 결과"
             // 사전 검색 기본 값.
             // value={
             //   Array.isArray(words) && words.length > 0
             //     ? words.map((item, index) => {
             //         const analysisResult = item[0];
             //         const dictionaryResult = Array.isArray(item[1]) && item[1].length > 0 && item[1][0].length > 0 ? item[1][0][1] : "";
     
             //         return `${analysisResult}\n${dictionaryResult}\n\n`;
             //       }).join("")
             //     : "형태소 분석 및 사전 검색 결과"
             // }
             value={
               Array.isArray(words) && words.length > 0
                 ? words.map((item, index) => {
                     const analysisResult = item[0];
                     let dictionaryResult = "";
             
                     if (Array.isArray(item[1]) && item[1].length > 0) {
                       const result0 = item[1][0][0];
                       const result1 = item[1][0][1];
             
                       if (result0.match(/^[a-zA-Z]/)) {
                         const mergedLength = item[1][0].reduce((total, str) => total + str.length, 0);
                         if (mergedLength > 50) {
                           let currentIndex = 0;
                           let currentLength = 0;
                           while (item[1][0][1][currentIndex]) {
                             currentLength += item[1][0][1][currentIndex].length;
                             if (currentLength > 50) {
                               dictionaryResult = item[1][0][1].slice(0, currentIndex + 1);
                               break;
                             }
                             currentIndex++;
                           }
                         }
                         else{
                         dictionaryResult = result1;
                         }
                       } else if (result0.match(/^[0-9(]/)) {
                         dictionaryResult = result0;
                       } else {
                         dictionaryResult = result0;
                       }
                     }
                     return `${analysisResult}\n${dictionaryResult}\n\n`;
                   }).join("")
                 : "형태소 분석 및 사전 검색 결과"
             }
             
             readOnly
           ></textarea>


          {/* 원래 왼쪽에는 형태소 분석, 오른쪽에는 형태소 사전 검색 결과가 있었지만 이제는 형태소, 사전검색 결과가 같이 나오도록 됨. \
              수정할 것 ->textarea 2개를 하나로 만들고 데이터가 많으면 스크롤로 내리도록 하기 */}
          {/* <textarea className={styles.outputbox}
            placeholder="형태소 사전 검색 결과"
            value={
              Array.isArray(word) && word.length > 0
                ? word.map((innerList, index) => (index > 0 ? "\n\n" : "") + innerList[0]).join("")
                : "형태소 사전 검색 결과"
            }readOnly>
          </textarea> */}
        </div>
      </div>

    );
  };
    
export default Main;
