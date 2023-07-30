//import React, { useEffect, useState } from "react";
//import { createWorker } from 'tesseract.js';

//const Image = () => {
//  return (
//    useEffect(async() => {
//      const worker =await createWorker({
//        logger: m => console.log(m)
//      });
//      
//      (async () => {
//        await worker.load();
//        await worker.loadLanguage('eng'); //추출대상 언어
//        await worker.initialize('eng');	//추출대상 언어
//        const { data: { text } } = await worker.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png');
//        console.log(text);
//        await worker.terminate();
//      })();
//  })
//  );
//};

//export default Image;

//const [image, setImage] = useState(null);
//  const [text, setText] = useState(
//    "현재 클립보드에 저장된 이미지가 없습니다. (No images are currently stored on the clipboard)"

//  async function getImageFromClipboard() {
//  await navigator.clipboard.readText();
//  const clipboardItems = await navigator.clipboard.read();
//  for (const item of clipboardItems) {
//    for (const type of item.types) {
//      if (type.startsWith("image/")) {
//        const blob = await item.getType(type);
//        if (blob) {
//          const img = document.createElement("img");
//          img.src = URL.createObjectURL(blob);
//          setImage(img);

import React, { useState } from "react";
import {createWorker} from "tesseract.js";
import axios from "axios";
import styles from "../styles/image.module.css";


function Image() {
  const [ocr, setOcr] = useState("");
  const [imageData, setImageData] = useState(null);
  const [translate, setTranslate] = useState("");
  const [morResult, setmorResult] = useState([]); // 초기값은 빈 배열로 설정
  const [morTranslate, setmorTranslate] = useState([]); // 초기값은 빈 배열로 설정

  const convertImageToText = async () => {
    if (!imageData) return;
    const worker =await createWorker({
      logger: (m) => {
        console.log(m);
      },
    });
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const {
      data: { text },
    } = await worker.recognize(imageData);
    setOcr(text);
  };

  const clicked = async () => { 
    axios
    .post("http://127.0.0.1:8000/api/PAPAGO/", {
      text: ocr,
    })
    .then((response) => {
      const translatedText1 = response.data.translated_text;
      setTranslate(translatedText1);
    })
    .catch((error) => {
      console.error(error);
      setTranslate("번역 실패");
    });
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/process_text/", {
        text: ocr,
      });
  
      const nouns = response.data.nouns;
  
      // 형태소 분석 결과를 words 상태로 업데이트
      setmorTranslate(nouns.map((word) => [word, ""]));
  
      // 형태소 분석 결과를 morp 상태로 업데이트
      setmorResult(nouns);
  
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
        setmorTranslate((prevWords) =>
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
      setmorResult(["형태소 분석 실패"]);
    }
  //   axios
  //   .post("http://127.0.0.1:8000/api/process_text/", {
  //     text: ocr,
  //   })
  //   .then((response) => {
  //     const nouns = response.data.nouns;
  //     setmorResult(nouns);

  //     // 파파고 API 호출(형태소 분석)
  //     nouns.forEach((morResult) => {
  //       axios
  //         .post("http://127.0.0.1:8000/api/PAPAGO/", {
  //           text: morResult,
  //         })
  //         .then((response) => {
  //           const translatedNoun = response.data.translated_text;
  //           setmorTranslate((prevWord) => [...prevWord, translatedNoun]);
  //         })
  //         .catch((error) => {
  //           console.error(error);
  //           setmorTranslate((prevWord) => [...prevWord, "형태소 번역 실패"]);
  //         });
  //     });
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //     setmorResult("형태소 분석 실패");
  //   });
  }
  // useEffect(() => {
  //   convertImageToText();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [imageData]);


  
  function handleImageChange(e) {
    const file = e.target.files[0];
    if(!file)return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageDataUri = reader.result;
      console.log({ imageDataUri });
      setImageData(imageDataUri);
    };
    reader.readAsDataURL(file);
  }
  // Tesseract로 영어 문장을 변환하고, 서버로 전송하는 함수
const sendTextToDjango = async (text) => {
  try {
    const response = await axios.post('/api/process_text/', { text });
    console.log(response.data); // 형태소 분석 결과
    // 분석 결과를 원하는 방식으로 처리
  } catch (error) {
    console.error(error);
  }
};

// 영어 문장 변환 후 sendTextToDjango 함수 호출 예시
const englishSentence = ocr;
sendTextToDjango(englishSentence);

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
      <div className={styles.Image}>
        <div>
          <h2>Choose an Image</h2>
          <input
            type="file"
            name=""
            id=""
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>
        <button className={styles.button} onClick={convertImageToText}>
          텍스트 추출
        </button>
        <div className={styles.displayflex}>
          <img src={imageData} alt="" srcset="" />
          <p>{ocr}</p>
        </div>
        <button className={styles.button} onClick={clicked}>
            번역
        </button>
        <div className={styles.blank1}>
          <textarea
            className={styles.translateBox}
            placeholder="번역 결과"
            value={translate}
            readOnly
          ></textarea>
        </div>
        <div className={styles.blank2}>
        <textarea
        className={styles.inputField}
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
          Array.isArray(morTranslate) && morTranslate.length > 0
            ? morTranslate.map((item, index) => {
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
          <hr />
        </div>
      </div>
    </div>
  );
}


export default Image;
