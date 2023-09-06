<<<<<<< HEAD
import React, { useState, useRef } from "react";
import { createWorker } from "tesseract.js";
=======
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
import { createWorker } from "tesseract.js";

>>>>>>> 595493a253d77832ec959475c816ed105c55b594
import axios from "axios";
import styles from "../styles/image.module.css";
import folder from "../styles/img/folder.png";
import arrow from "../styles/img/arrow.png";
import html2canvas from "html2canvas";

<<<<<<< HEAD
//var button2Count = 1;

=======
>>>>>>> 595493a253d77832ec959475c816ed105c55b594
function Image() {
  const [ocr, setOcr] = useState("");
  const [imageData, setImageData] = useState(null);
  const [translate, setTranslate] = useState("");
  const [morResult, setmorResult] = useState([]); // 초기값은 빈 배열로 설정
  const [morTranslate, setmorTranslate] = useState([]); // 초기값은 빈 배열로 설정
  const [button2Count, setButton2Count] = useState(0);
  const [extractionResult, setExtractionResult] = useState("");
  const [showMorphemeBox, setShowMorphemeBox] = useState(false);

  //const button2Switch = async () => {
  //<한글 번역>상태는 짝수, <텍스트 추출>상태는 홀수
  //if (button2Count%2== 1) convertImageToText();
  //if (button2Count%2== 0) clicked();
  //}

  // 영문 이미지 문장 추출
  const convertImageToText = async () => {
    if (!imageData) return;
    const worker = await createWorker({
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
    setExtractionResult(text);

<<<<<<< HEAD
    //document.getElementById("button2").innerHTML = "한글 번역";
    //button2Count++;
  
    setShowMorphemeBox(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/process_text/",
        {
          text: text,
        }
      );

      const nouns = response.data.nouns;

      // 형태소 분석 결과를 words 상태로 업데이트
      setmorTranslate(nouns.map((word) => [word, ""]));

      // 형태소 분석 결과를 morp 상태로 업데이트
      setmorResult(nouns);

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
  };

  const clicked = async () => {
    //document.getElementById("button2").innerHTML = "텍스트 추출";
    //setButton2Count((prevCount) => prevCount + 1);
    //button2Count++;

    axios
      .post("http://127.0.0.1:8000/api/PAPAGO/", {
        text: extractionResult,
      })
      .then((response) => {
        const translatedText1 = response.data.translated_text;
        setExtractionResult(translatedText1);
      })
      .catch((error) => {
        console.error(error);
        setExtractionResult("번역 실패");
      });
  };
=======
  const clicked = () => {
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

    axios
      .post("http://127.0.0.1:8000/api/process_text/", {
        text: ocr,
      })
      .then((response) => {
        const nouns = response.data.nouns;
        setmorResult(nouns);

        nouns.forEach((morResult) => {
          axios
            .post("http://127.0.0.1:8000/api/PAPAGO/", {
              text: morResult,
            })
            .then((response) => {
              const translatedNoun = response.data.translated_text;
              setmorTranslate((prevWord) => [...prevWord, translatedNoun]);
            })
            .catch((error) => {
              console.error(error);
              setmorTranslate((prevWord) => [...prevWord, "형태소 번역 실패"]);
            });
        });
      })
      .catch((error) => {
        console.error(error);
        setmorResult("형태소 분석 실패");
      });
  };

>>>>>>> 595493a253d77832ec959475c816ed105c55b594
  // useEffect(() => {
  //   convertImageToText();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [imageData]);

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageDataUri = reader.result;
      console.log({ imageDataUri });
      setImageData(imageDataUri);
    };
    reader.readAsDataURL(file);
  }
<<<<<<< HEAD

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

  const button2Switch = async () => {
    if (button2Count % 2 === 0) {
      await convertImageToText();
    } else {
      await clicked();
    }
    setButton2Count((prevCount) => prevCount + 1);
  };

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
  
=======
  // Tesseract로 영어 문장을 변환하고, 서버로 전송하는 함수
  const sendTextToDjango = async (text) => {
    try {
      const response = await axios.post("/api/process_text/", { text });
      console.log(response.data); // 형태소 분석 결과
      // 분석 결과를 원하는 방식으로 처리
    } catch (error) {
      console.error(error);
    }
  };

  // 영어 문장 변환 후 sendTextToDjango 함수 호출 예시
  const englishSentence = ocr;
  sendTextToDjango(englishSentence);
>>>>>>> 595493a253d77832ec959475c816ed105c55b594

  return (
    <div className={styles.mainlayout}>
      <div className={styles.textposition1}>
        <h2>이미지를 첨부해주세요</h2>
      </div>
      <div className={styles.container}>
        <button className={styles.inputfilebutton} onClick={handleButtonClick}>
          이미지 첨부
        </button>
<<<<<<< HEAD
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
          <img className={styles.ocrimg} src={imageData} alt="" srcset="" />
      
      
      <div className={styles.container2}>
        <button
          id="button2"
          className={styles.button2}
          onClick={button2Switch}
          >
          {button2Count % 2 === 0 ? "텍스트 추출" : "한글 번역"}
        </button>
        <textarea
          className={styles.outputbox}
          placeholder="번역 결과"
          value={extractionResult}
          readOnly
        ></textarea>
=======
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
>>>>>>> 595493a253d77832ec959475c816ed105c55b594
      </div>

      <div className={styles.arrow}></div>

      <div className={styles.container3}></div>
      <div className={styles.resultBox}>
        <h2>번역된 문장에서 단어를 추출한 결과입니다.</h2>
        <button className={styles.button2_3} onClick={captureAndSaveImage}>
          결과 이미지 저장
        </button>
        {/* <button className={styles.button2_1} >형태소 분석하기</button>
        <button className={styles.button2_2} >한국어 결과보기</button> */}
      </div>

      {showMorphemeBox && (
        <div className={styles.morphemeBox} ref={morResultRef}>
          <ul className={styles.outputbox2}>
            {Array.isArray(morTranslate) && morTranslate.length > 0 ? (
              morTranslate.map((item, index) => {
                const analysisResult = item[0];
                const dictionaryResult =
                  Array.isArray(item[1]) &&
                  item[1].length > 0 &&
                  item[1][0].length > 0
                    ? item[1][0][1]
                    : "";

                const analysisResultStyle = {
                  fontWeight: 'bold',
                  color :'black',
                  fontSize :'30px',
                  marginRight: '30px'
                };
    
                const dictionaryResultStyle = {
                  color :'black',
                  marginRight: '20px'
                };
    
                const listItemStyle = {
                  display: 'flex',
                  alignItems: 'center',
                  margin: '30px 0', // index 사이의 간격을 조절합니다.
                };    

                return (
                  <li key={index} style={listItemStyle}>
                    <span style={analysisResultStyle}>{analysisResult}</span>
                    <br />
                    <span style={dictionaryResultStyle}>{dictionaryResult}</span>
                  </li>
                );
              })
            ) : (
              <li>형태소 분석 및 사전 검색 결과</li>
            )}
          </ul>
          {/* <textarea
          className={styles.outputbox2}
          placeholder="형태소 분석 및 사전 검색 결과"
          //사전 검색 기본 값.
          value={
            Array.isArray(morTranslate) && morTranslate.length > 0
              ? morTranslate
                  .map((item, index) => {
                    const analysisResult = item[0];
                    const dictionaryResult =
                      Array.isArray(item[1]) &&
                      item[1].length > 0 &&
                      item[1][0].length > 0
                        ? item[1][0][1]
                        : "";

                    return `${analysisResult}\n${dictionaryResult}\n\n`;
                  })
                  .join("")
              : "형태소 분석 및 사전 검색 결과"
          }
          readOnly
        ></textarea> */}

          {/* 원래 왼쪽에는 형태소 분석, 오른쪽에는 형태소 사전 검색 결과가 있었지만 이제는 형태소, 사전검색 결과가 같이 나오도록 됨. \
          수정할 것 ->textarea 2개를 하나로 만들고 데이터가 많으면 스크롤로 내리도록 하기 */}
        </div>
      )}
    </div>
  );
}

export default Image;
