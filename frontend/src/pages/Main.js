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
    }
    
    const mor_Clicked = async () => {
      // 형태소 분석
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/process_text/", {
          text: textValue,
        });
    
        const nouns = response.data.nouns;
    
        // 형태소 분석 결과를 words 상태로 업데이트
        setWords(nouns.map((word) => [word, ""]));
    
        // 형태소 분석 결과를 morp 상태로 업데이트
        setMorp(nouns);
        setWord([]); // 형태소 분석 시에 word를 초기화합니다.
      } catch (error) {
        console.error(error);
        setMorp("형태소 분석 실패");
      }
    };
  
    const diction_Clicked = async () => {
      // 형태소 사전 검색 호출
      const results = [];
      for (const item of morp) {
        try {
          const dict = await searchDictionary(item);
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
        text
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
        <button className={styles.button2_1} onClick={mor_Clicked}>형태소 분석하기</button>
        <button className={styles.button2_2} onClick={diction_Clicked}>한국어 결과보기</button>
      </div>
      <div className={styles.blank2}>
        <textarea
          className={styles.inputField}
          placeholder="형태소 분석 결과"
          value={Array.isArray(morp) ? morp.join("\n") : ""}
          readOnly
        ></textarea>
        <div className={styles.arrow1}></div>
        <div className={styles.arrow2}></div>

        {/* 형태소 번역 공간 */}
        <textarea
          className={styles.outputbox}
          placeholder="형태소 사전 검색 결과"
          value={
            Array.isArray(word) && word.length > 0
              ? word.map((innerList, index) => (index > 0 ? "\n\n" : "") + innerList[0]).join("")
              : "형태소 사전 검색 결과"
          }
          readOnly
        ></textarea>
        <hr />
      </div>
      <div className={styles.blank3}>
        <hr />
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


