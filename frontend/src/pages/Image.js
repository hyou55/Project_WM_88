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

var button2Count = 1;

function Image() {
  const [ocr, setOcr] = useState("");
  const [imageData, setImageData] = useState(null);
  const [translate, setTranslate] = useState("");
  const [morResult, setmorResult] = useState([]); // 초기값은 빈 배열로 설정
  const [morTranslate, setmorTranslate] = useState([]); // 초기값은 빈 배열로 설정



  const button2Switch = async () => { 
    //<한글 번역>상태는 짝수, <텍스트 추출>상태는 홀수
    if (button2Count%2== 1) convertImageToText();
    if (button2Count%2== 0) clicked();
  }

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

    document.getElementById("button2").innerHTML = "한글 번역";
    button2Count++;
  };


  const clicked = async () => { 
    document.getElementById("button2").innerHTML = "텍스트 추출";
    button2Count++;

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


      // 이미지 첨부 버튼 클릭 시 파일 선택 창 열기
  const handleButtonClick = () => {
    document.getElementById("file-input").click();
  };


  return (
    
    <div className={styles.mainlayout}>
      <div className={styles.textposition1}>
        <h2>이미지를 첨부해주세요</h2>
      </div>
      <div className={styles.textposition3}>
        {/* 버튼으로 변경된 부분 */}
        <button className={styles.inputfilebutton} onClick={handleButtonClick}>
          이미지 첨부
        </button>
        <input
          type="file"
          id="file-input"
          name="이미지 첨부"
          onChange={handleImageChange}
          accept="image/*"
          style={{ display: "none" }}
        />
        <img className={styles.folderimg} src={folder} alt="Folder Icon" />
      </div>
      
      <div className={styles.Image}>
        <div>
          <button id="button2" className={styles.button2} onClick={button2Switch}>
            텍스트 추출
          </button>

          {/* <button className={styles.button} onClick={clicked}>
          한글 번역  
          </button> */}


        </div> 
        <div className={styles.displayflex}>
          <img className={styles.ocrimg} src={imageData} alt="" srcset="" />
          <img className={styles.arrowimg} src={arrow} ></img>
          <div className={styles.outputbox}>{ocr}</div>
        </div>
          <textarea
            className={styles.outputbox}
            placeholder="번역 결과"
            value={translate}
            readOnly
          ></textarea>
      </div>

      <div className={styles.blank0}></div>
      <div className={styles.resultBox}>
        <h4>문장 분석 결과입니다.</h4>
        <h2>단어장에 추가하고 싶은 단어를 선택해주세요.</h2>
        {/* <button className={styles.button2_1} >형태소 분석하기</button>
        <button className={styles.button2_2} >한국어 결과보기</button> */}
      </div>
      <div className={styles.morphemeBox}>  
        <textarea
          className={styles.outputbox2}
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

      {/* 원래 왼쪽에는 형태소 분석, 오른쪽에는 형태소 사전 검색 결과가 있었지만 이제는 형태소, 사전검색 결과가 같이 나오도록 됨. \
          수정할 것 ->textarea 2개를 하나로 만들고 데이터가 많으면 스크롤로 내리도록 하기 */}
      {/* <textarea
        className={styles.outputbox2}
        placeholder="형태소 번역 결과"
        value={Array.isArray(morTranslate) ? morTranslate.join("\n") : ""}
        readOnly
      ></textarea> */}
      </div>
    </div>
  );
}


export default Image;
