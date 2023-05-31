import React from "react";
import "../styles/Image.module.css"
import {useRef} from 'react';

const Image = () => {

  const imageInput = useRef();

  const onCickImageUpload = () => {
    imageInput.current.click();
  };

  return (
    <body>
      <imagebox>
        <imagebox3> 
          <img src = {"/icon/Folder.jpeg"} alt = {" "}/>
          <input type="file" style={{ display: "none" }} ref={imageInput} /><button onClick={onCickImageUpload}>이미지업로드</button>
        </imagebox3>
        <imagebox2>이미지를 첨부해주세요</imagebox2>
      </imagebox>
      
      <imagebox4></imagebox4>

      <imagebox5>
        영어 단어 결과입니다.
      </imagebox5>
      
      <imagebox6>
        단어장에 추가하고 싶은 단어를 선택하세요.
        <input type="file" style={{ display: "none" }} ref={imageInput} /><button onClick={onCickImageUpload }>한국어 결과보기</button>
      </imagebox6>

      <imagebox4></imagebox4>

      <imagebox7>
        저장할 폴더를 선택해 주세요
      </imagebox7>

      <imagebox8>
        <img src = {"/icon/Note2.png"}/>
      </imagebox8>

    </body>
    
    
  );
};


export default Image;