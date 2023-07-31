import React, { useState } from "react";
import styles from "../styles/Main.module.css";
import axios from "axios";

const Main = () => {
  const [textValue, setTextValue] = useState("");
  const [resultValue1, setResultValue1] = useState("");
  const [morp, setMorp] = useState([]); // 초기값은 빈 배열로 설정
  const [word, setWord] = useState([]); // 리스트의 리스트로 초기화

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
    }
    
    const mor_Clicked = async () => {
      //형태소 분석
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/process_text/", {
          text: textValue,
        });
  
        const nouns = response.data.nouns;
        setMorp(nouns);
        setWord([]); // 형태소 분석 시에 word를 초기화합니다.
      } catch (error) {
        console.error(error);
        setMorp("형태소 분석 실패");
      }
    };
  
    const diction_Clicked = async () => {
      //형태소 사전 검색 호출
      const results = [];
      for (const item of morp) {
        try {
          const dict = await searchDictionary(item);
          results.push(dict);
        } catch (error) {
          console.error(error);
          results.push("형태소 사전 검색 실패");
        }
      }
    
      setWord(results);
    };
  
    //형태소 사전 검색 호출
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
          
          <div className={styles.arrow}></div>
  
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
          <button className={styles.button2_1} onClick={mor_Clicked}>형태소 분석하기</button>
          <button className={styles.button2_2} onClick={diction_Clicked}>한국어 결과보기</button>
        </div>
        
        {/* <div className={styles.wordSave}>
          <h5>저장할 폴더를 선택해주세요</h5>
          <button className={styles.button3}>저장</button>
          <hr></hr>
          <p className={styles.saveVocaAdd}>단어장A</p>
          
        </div> */}
        <div className={styles.morphemeBox}>
          <textarea className={styles.outputbox}
            placeholder="형태소 분석 결과"
            value={Array.isArray(morp) ? morp.join("\n") : ""}
            readOnly>

          </textarea>
          <textarea className={styles.outputbox}
            placeholder="형태소 사전 검색 결과"
            value={
              Array.isArray(word) && word.length > 0
                ? word.map((innerList, index) => (index > 0 ? "\n\n" : "") + innerList[0]).join("")
                : "형태소 사전 검색 결과"
            }readOnly>
          </textarea>
        </div>
      </div>

    );
  };
    
export default Main;




// import React, { useState } from "react";
// import styles from "../styles/Main.module.css";
// import axios from "axios";

// const Main = () => {
//   const [textValue, setTextValue] = useState("");
//   const [resultValue1, setResultValue1] = useState("");
//   const [morp, setMorp] = useState([]); // 초기값은 빈 배열로 설정
//   const [word, setWord] = useState([]); // 리스트의 리스트로 초기화

//   const handleSetValue = (e) => {
//     setTextValue(e.target.value);
//   };

//   const clicked = () => {
//     axios
//       .post("http://127.0.0.1:8000/api/PAPAGO/", {
//         text: textValue,
//       })
//       .then((response) => {
//         const translatedText1 = response.data.translated_text;
//         setResultValue1(translatedText1);
//       })
//       .catch((error) => {
//         console.error(error);
//         setResultValue1("번역 실패");
//       });
//     }
    
//     const mor_Clicked = async () => {
//       // 형태소 분석
//       try {
//         const response = await axios.post("http://127.0.0.1:8000/api/process_text/", {
//           text: "Chinese audiences are gravitating toward movies made at home, rather than in Hollywood",
//         });
  
//         const nouns = response.data.nouns;
//         setMorp(nouns);
//         setWord([]); // 형태소 분석 시에 word를 초기화합니다.
//       } catch (error) {
//         console.error(error);
//         setMorp("형태소 분석 실패");
//       }
//     };
  
//     const diction_Clicked = async () => {
//       // 형태소 사전 검색 호출
//       const results = [];
//       for (const item of morp) {
//         try {
//           const dict = await searchDictionary(item);
//           results.push(dict);
//         } catch (error) {
//           console.error(error);
//           results.push("형태소 사전 검색 실패");
//         }
//       }
    
//       setWord(results);
//     };
  
//     // 형태소 사전 검색 호출
//     const searchDictionary = (morp) => {
//       return axios
//         .post("http://127.0.0.1:8000/api/Dictionary/", {
//           text: morp,
//         })
//         .then((response) => {
//           const dict = response.data.result; // 형태소 사전 검색 결과 추출
//           return dict;
//         })
//         .catch((error) => {
//           console.error(error);
//           throw new Error("형태소 사전 검색 실패");
//         });
//     };

//   return (
//     <div className={styles.mainlayout}>
//       <div className={styles.textposition1}>
//         <h2>영어</h2>
//       </div>
//       <div className={styles.textposition2}>
//         <h2>한국어</h2>
//       </div>
//       <div className={styles.blank0}>
//         <hr />
//       </div>
//       <textarea
//         className={styles.inputField}
//         placeholder="번역할 내용을 입력하세요."
//         value={textValue}
//         onChange={handleSetValue}
//         text
//       ></textarea>
//       <button className={styles.button} onClick={clicked}>
//         번역
//       </button>
//       <div className={styles.arrow1}></div>
//       <div className={styles.arrow2}></div>
//       <textarea
//         className={styles.outputbox}
//         placeholder="번역 결과"
//         value={resultValue1}
//         readOnly
//       ></textarea>

//       <div className={styles.blank1}>
//         <h4>영어 단어 결과입니다.</h4>
//         <h2>단어장에 추가하고 싶은 단어를 선택해주세요.</h2>
//         <button className={styles.button2_1} onClick={mor_Clicked}>형태소 분석하기</button>
//         <button className={styles.button2_2} onClick={diction_Clicked}>한국어 결과보기</button>
//       </div>
//       <div className={styles.blank2}>
//         <textarea
//           className={styles.inputField}
//           placeholder="형태소 분석 결과"
//           value={Array.isArray(morp) ? morp.join("\n") : ""}
//           readOnly
//         ></textarea>
//         <div className={styles.arrow1}></div>
//         <div className={styles.arrow2}></div>

//         {/* 형태소 번역 공간 */}
//         <textarea
//           className={styles.outputbox}
//           placeholder="형태소 사전 검색 결과"
//           value={
//             Array.isArray(word) && word.length > 0
//               ? word.map((innerList, index) => (index > 0 ? "\n\n" : "") + innerList[0]).join("")
//               : "형태소 사전 검색 결과"
//           }
//           readOnly
//         ></textarea>
//         <hr />
//       </div>
//       <div className={styles.blank3}>
//         <hr />
//       </div>
//       <div className={styles.blank4}>
//         <h5>저장할 폴더를 선택해주세요</h5>
//         <img src={process.env.PUBLIC_URL + "/voca-img.png"} width="150px" />
//         <button className={styles.button3}>저장</button>
//       </div>
//       <div className={styles.blank5}>
//         <hr />
//       </div>
//     </div>
//   );
// };

// export default Main;


