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
import styles from "../styles/image.module.css";
import axios from "axios";

function Image() {
  const [ocr, setOcr] = useState("");
  const [imageData, setImageData] = useState(null);
  //const [textValue, setTextValue] = useState("");
  const [resultValue, setResultValue] = useState("");

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

    // img에서 text화된 문장을 백으로 보내서 형태소 분석하도록
    const convertedText = ocr;
    sendTextToDjango(convertedText);
  };

  useEffect(() => {
    convertImageToText();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageData]);

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
  const sendTextToDjango = async (convertedText) => {
    // try {
    //   const response = await axios.post("/api/analyze_text/", {
    //     text: convertedText,
    //   });
    //   const analyzedText = response.data.result;
    //   console.log(analyzedText); // 형태소 분석 결과
    //   // 분석 결과를 원하는 방식으로 처리
    // } catch (error) {
    //   console.error(error);
    // }

    axios
      .post("http://localhost:8000/api/analze_text", {
        text: convertedText,
      })
      .then((response) => {
        const analyzedText = response.data.analyzed_text;
        setResultValue(analyzedText);
      })
      .catch((error) => {
        console.error(error);
        setResultValue("번역 실패");
      });
  };
  // 영어 문장 변환 후 sendTextToDjango 함수 호출 예시
  // const convertedText = ocr;
  // sendTextToDjango(convertedText);

  return (
    <div className={styles.Image}>
      <div>
        <p>Choose an Image</p>
        <input
          type="file"
          name=""
          id=""
          onChange={handleImageChange}
          accept="image/*"
        />
      </div>
      <div className={styles.displayflex}>
        <img src={imageData} alt="" srcset="" />
        <p>{ocr}</p>
      </div>
      <textarea
        class={styles.outputbox}
        placeholder="형태소 결과"
        value={resultValue}
        readOnly
      ></textarea>
    </div>
  );
}

export default Image;
