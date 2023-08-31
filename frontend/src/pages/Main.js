import React, { useState, useRef } from "react";
import styles from "../styles/Main.module.css";
import axios from "axios";
import html2canvas from "html2canvas";

const Main = () => {
  const [textValue, setTextValue] = useState("");
  const [resultValue1, setResultValue1] = useState("");
  const [morp, setMorp] = useState([]); // 형태소 분석된 것들의 리스트
  const [words, setWords] = useState([]); // 형태소 사전 검색한 것들의 리스트(사전 검색의 전체 문장이 들어있음)
  // const [word, setWord] = useState([]); // 형태소 사전 검색한 것들의 리스트(사전 검색 안에서 또 개별 단어가 리스트화 됨)
  const [showMorphemeBox, setShowMorphemeBox] = useState(false);

  const handleSetValue = (e) => {
    setTextValue(e.target.value);
  };

  const clicked = async () => {
    setShowMorphemeBox(true);
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
      const response = await axios.post(
        "http://127.0.0.1:8000/api/process_text/",
        {
          text: textValue,
        }
      );

      const nouns = response.data.nouns;

      // 형태소 분석 결과를 words 상태로 업데이트
      setWords(nouns.map((word) => [word, ""]));

      // 형태소 분석 결과를 morp 상태로 업데이트
      setMorp(nouns);

      // 형태소 사전 검색 호출
      const results = [];
      for (const item of nouns) {
        let dict = ""; // 사전 검색 결과를 담을 변수
        while (dict === "") {
          // 사전 검색 결과가 빈 문자열일 경우 계속해서 사전 검색 수행
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
  };

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

  // DOM화면을 이미지로 저장하는 코드
  const morResultRef = useRef(null);

  const captureAndSaveImage = () => {
    // 캡처할 요소를 선택 (여기서는 morResult div를 선택)
    const element = morResultRef.current;

    // html2canvas를 사용하여 선택한 div 요소를 이미지로 변환
    html2canvas(element).then((canvas) => {
      // 변환된 이미지를 저장할 수 있는 링크 생성
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "captured_image.png"; // 저장할 이미지 파일 이름 지정

      // 링크를 클릭하여 이미지 저장
      link.click();
    });
  };

  return (
    <div className={styles.mainlayout}>
      <div className={styles.translatedBox}>
        <div className={styles.left}>
          <h2>영어</h2>
          <div className={styles.textposition1}>
            <textarea
              className={styles.inputField}
              placeholder="번역할 내용을 입력하세요."
              value={textValue}
              onChange={handleSetValue}
            ></textarea>
            <hr></hr>
            <button className={styles.button} onClick={clicked}>
              번역
            </button>
          </div>
        </div>

        <div className={styles.arrow}></div>

        <div className={styles.right}>
          <h2>한국어</h2>
          <div className={styles.textposition2}>
            <textarea
              class={styles.outputField}
              placeholder="번역 결과"
              value={resultValue1}
              readOnly
            ></textarea>
          </div>
        </div>
      </div>

      <div className={styles.resultBox}>
        <h2>번역된 문장에서 단어를 추출한 결과입니다.</h2>
        <button className={styles.button2_3} onClick={captureAndSaveImage}>
          결과 이미지 저장
        </button>
        {/* <button className={styles.button2_1} onClick={mor_Clicked}>형태소 분석하기</button>
          <button className={styles.button2_2} onClick={diction_Clicked}>한국어 결과보기</button> */}
      </div>

      {/* <div className={styles.wordSave}>
          <h5>저장할 폴더를 선택해주세요</h5>
          <button className={styles.button3}>저장</button>
          <hr></hr>
          <p className={styles.saveVocaAdd}>단어장A</p>
          
        </div> */}

      {/* <div className={styles.morphemeBox} ref={morResultRef}>
          <textarea className={styles.outputbox}
             placeholder="형태소 분석 및 사전 검색 결과"
             // 사전 검색 기본 값.
             value={
               Array.isArray(words) && words.length > 0
                 ? words.map((item, index) => {
                     const analysisResult = item[0];
                     const dictionaryResult = Array.isArray(item[1]) && item[1].length > 0 && item[1][0].length > 0 ? item[1][0] : "";
     
                     return `${analysisResult}\n${dictionaryResult}\n\n`;
                   }).join("")
                 : "error"
             } */}

      {/*
            //  value={
            //    Array.isArray(words) && words.length > 0
            //      ? words.map((item, index) => {
            //          const analysisResult = item[0];
            //          let dictionaryResult = "";
             
            //          if (Array.isArray(item[1]) && item[1].length > 0) {
            //            const result0 = item[1][0][0];
            //            const result1 = item[1][0][1];
             
            //            if (result0.match(/^[a-zA-Z]/)) {
            //              const mergedLength = item[1][0].reduce((total, str) => total + str.length, 0);
            //              if (mergedLength > 50) {
            //                let currentIndex = 0;
            //                let currentLength = 0;
            //                while (item[1][0][1][currentIndex]) {
            //                  currentLength += item[1][0][1][currentIndex].length;
            //                  if (currentLength > 50) {
            //                    dictionaryResult = item[1][0][1].slice(0, currentIndex + 1);
            //                    break;
            //                  }
            //                  currentIndex++;
            //                }
            //              }
            //              else{
            //              dictionaryResult = result1;
            //              }
            //            } else if (result0.match(/^[0-9(]/)) {
            //              dictionaryResult = result0;
            //            } else {
            //              dictionaryResult = result0;
            //            }
            //          }
            //          return `${analysisResult}\n${dictionaryResult}\n\n`;
            //        }).join("")
            //      : "형태소 분석 및 사전 검색 결과"
            //  }
             
             readOnly
           ></textarea>
            </div> 
          */}

      {showMorphemeBox && (
        <div className={styles.morphemeBox} ref={morResultRef}>
          {/* 형태소 분석 및 사전 검색 결과 */}
          <ul className={styles.outputbox}>
            {Array.isArray(words) && words.length > 0 ? (
              words.map((item, index) => {
                const analysisResult = item[0];
                const dictionaryResult =
                  Array.isArray(item[1]) &&
                  item[1].length > 0 &&
                  item[1][0].length > 0
                    ? item[1][0][1]
                    : "";

                return (
                  <li key={index}>
                    {analysisResult}
                    <br />
                    {dictionaryResult}
                  </li>
                );
              })
            ) : (
              <li>형태소 분석 및 사전 검색 결과</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Main;
