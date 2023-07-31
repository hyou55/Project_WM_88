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
import folder from "../styles/img/folder.png";
import arrow from "../styles/img/arrow.png";


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

  return (
    
    <div className={styles.mainlayout}>
      <div className={styles.textposition1}>
        <h2>이미지를 첨부해주세요</h2>
      </div>
      <div className={styles.textposition3}>
      <label className={styles.inputfilebutton} for="input-file">
          이미지 첨부
        </label>
        <input
          type="file"
          name=""
          id="input-file"
          onChange={handleImageChange}
          accept="image/*"
          style={{display:"none"}}
        />
        <img className={styles.folderimg} src={folder} />
      </div>
      
      <div className={styles.Image}>
        <div>
        <button className={styles.button} onClick={clicked}>
          한글 번역  
        </button>
          <button className={styles.button2} onClick={convertImageToText} >
            텍스트 추출
          </button>
        </div> 
        <div className={styles.displayflex}>
          <img src={imageData} alt="" srcset="" />
          <img className={styles.arrowimg} src={arrow} />
          <div className={styles.outputField}>{ocr}</div>
        </div>
          <textarea
            className={styles.outputbox}
            placeholder="번역 결과"
            value={translate}
            readOnly
          ></textarea>
        <div className={styles.resultBox}>
          <h4>문장 분석 결과입니다.</h4>
          <h2>단어장에 추가하고 싶은 단어를 선택해주세요.</h2>
          <button className={styles.button2_1} >형태소 분석하기</button>
          <button className={styles.button2_2} >한국어 결과보기</button>
        </div>
        <div className={styles.blank2}>
          <textarea
            className={styles.inputField}
            placeholder="형태소 분석 결과"
            value={Array.isArray(morResult) ? morResult.join("\n") : ""}
            readOnly
          ></textarea>
        <div className={styles.arrow1}></div>
        <div className={styles.arrow2}></div>

        {/* 형태소 번역 공간 */}
        <textarea
          className={styles.outputbox}
          placeholder="형태소 번역 결과"
          value={Array.isArray(morTranslate) ? morTranslate.join("\n") : ""}
          readOnly
        ></textarea>
          <hr />
        </div>
      </div>
    </div>
  );
}


export default Image;
