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
import {createWorker} from "tesseract.js";
import styles from "../styles/image.module.css";

function Image() {
  const [ocr, setOcr] = useState("");
  const [imageData, setImageData] = useState(null);
  
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

  useEffect(() => {
    convertImageToText();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageData]);

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
    </div>
  );
}


export default Image;
