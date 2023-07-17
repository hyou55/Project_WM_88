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

import React, { useEffect, useState } from "react";
import { createWorker } from "tesseract.js";
import axios from "axios";
import styles from "../styles/image.module.css";
import axios from "axios";

function Image() {
  const [ocr, setOcr] = useState("");
  const [imageData, setImageData] = useState(null);
  const [translate, setTranslate] = useState("");
  const [result, setResult] = useState([]); // 초기값은 빈 배열로 설정

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
    setOcr(text);

    test(ocr);
  };

  const test = () => {
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
        setResult(nouns);
      })
      .catch((error) => {
        console.error(error);
        setResult("형태소 분석 실패");
      });
  };
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

  return (
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
        번역
      </button>
      <div className={styles.displayflex}>
        <img src={imageData} alt="" srcset="" />
        <p>{ocr}</p>
      </div>
      <textarea
        className={styles.outputbox}
        placeholder="번역 결과"
        value={translate}
        readOnly
      ></textarea>
      <textarea
        className={styles.outputbox}
        placeholder="형태소 분석 결과"
        value={Array.isArray(result) ? result.join("\n") : ""}
        readOnly
      ></textarea>
    </div>
  );
}

export default Image;
