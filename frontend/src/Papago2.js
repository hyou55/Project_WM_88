// import React, { useState } from 'react';
// import axios from 'axios';

// const Papago2 = () => {
//   const [query, setQuery] = useState('');
//   const [translation, setTranslation] = useState('');

//   const handleTranslate = async () => {
//     const client_id = 'lUmpXs3j1n6tF4ycqdrp';
//     const client_secret = 'ttvQqE7dMc';
//     const api_url = "https://openapi.naver.com/v1/papago/n2mt";

//     try {
//       const response = await axios.post(
//         api_url,
//         { source: 'ko', target: 'en', text: query },
//         {
//           headers: {
//             'X-Naver-Client-Id': client_id,
//             'X-Naver-Client-Secret': client_secret,
//             'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
//           },
//         }
//       );

//       setTranslation(response.data.message.result.translatedText);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//       />
//       <button onClick={handleTranslate}>Translate</button>
//       <p>{translation}</p>
//     </div>
//   );
// };

// export default Papago2;

// import React, { useState } from 'react';

// function Papago2() {
//   const [sentence, setSentence] = useState('');
//   const [translateOpt, setTranslateOpt] = useState('ko>en');
//   const [translatedText, setTranslatedText] = useState('');

//   const handleSentenceChange = (event) => {
//     setSentence(event.target.value);
//   };

//   const handleTranslateOptChange = (event) => {
//     setTranslateOpt(event.target.value);
//   };

//   const translate = () => {
//     if (sentence === '') {
//       alert('번역할 문장을 입력하세요.');
//       return;
//     }

//     // 네이버 Papago NMT 기계번역 Open API 예제
//     const clientId = 'lUmpXs3j1n6tF4ycqdrp'; // 네이버 개발자센터에서 발급받은 CLIENT ID
//     const clientSecret = 'ttvQqE7dMc'; // 네이버 개발자센터에서 발급받은 CLIENT SECRET
//     const encText = encodeURIComponent(sentence);

//     let postvars = '';
//     if (translateOpt === 'ko>en') {
//       postvars = 'source=ko&target=en';
//     }
//     if (translateOpt === 'en>ko') {
//       postvars = 'source=en&target=ko';
//     }
//     postvars += '&text=' + encText;

//     const url = 'http://cors-anywhere.herokuapp.com/http://openapi.naver.com/v1';

//     fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
//         'X-Naver-Client-Id': clientId,
//         'X-Naver-Client-Secret': clientSecret,
//       },
//       body: postvars,
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('API 요청에 실패했습니다.');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         const translatedText = data.message.result.translatedText;
//         setTranslatedText(translatedText);
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   };

//   return (
//     <div>
//       <h1>파파고 번역 API</h1>
//       <form style={{ margin: 0 }}>
//         <select value={translateOpt} onChange={handleTranslateOptChange}>
//           <option value="ko>en">한글을 영어로</option>
//           <option value="en>ko">영어를 한글로</option>
//         </select>
//         <input type="text" value={sentence} onChange={handleSentenceChange} />
//         <button type="button" onClick={translate}>
//           번역
//         </button>
//       </form>
//       <div>번역된 문장 : <b>{translatedText}</b></div>
//     </div>
//   );
// }

// export default Papago2;

// import React, { useState } from 'react';

// function Papago2() {
//   const [sentence, setSentence] = useState('');
//   const [translateOpt, setTranslateOpt] = useState('ko>en');
//   const [translatedText, setTranslatedText] = useState('');

//   const handleSentenceChange = (event) => {
//     setSentence(event.target.value);
//   };

//   const handleTranslateOptChange = (event) => {
//     setTranslateOpt(event.target.value);
//   };

//   const translate = () => {
//     if (sentence === '') {
//       alert('번역할 문장을 입력하세요.');
//       return;
//     }

//     // 네이버 Papago NMT 기계번역 Open API 예제
//     const clientId = 'lUmpXs3j1n6tF4ycqdrp'; // 네이버 개발자센터에서 발급받은 CLIENT ID
//     const clientSecret = 'ttvQqE7dMc'; // 네이버 개발자센터에서 발급받은 CLIENT SECRET
//     const encText = encodeURIComponent(sentence);

//     let postvars = '';
//     if (translateOpt === 'ko>en') {
//       postvars = 'source=ko&target=en';
//     }
//     if (translateOpt === 'en>ko') {
//       postvars = 'source=en&target=ko';
//     }
//     postvars += '&text=' + encText;

//     const url = 'http://cors-anywhere.herokuapp.com/https://openapi.naver.com/v1';

//     fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
//         'X-Naver-Client-Id': clientId,
//         'X-Naver-Client-Secret': clientSecret,
//       },
//       body: postvars,
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('API 요청에 실패했습니다.');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         const translatedText = data?.message?.result?.translatedText;
//         if (translatedText) {
//           setTranslatedText(translatedText);
//         } else {
//           throw new Error('번역된 텍스트를 가져올 수 없습니다.');
//         }
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   };

//   return (
//     <div>
//       <h1>파파고 번역 API</h1>
//       <form style={{ margin: 0 }}>
//         <select value={translateOpt} onChange={handleTranslateOptChange}>
//           <option value="ko>en">한글을 영어로</option>
//           <option value="en>ko">영어를 한글로</option>
//         </select>
//         <input type="text" value={sentence} onChange={handleSentenceChange} />
//         <button type="button" onClick={translate}>
//           번역
//         </button>
//       </form>
//       <div>번역된 문장 : <b>{translatedText}</b></div>
//     </div>
//   );
// }

// export default Papago2;

import React, { useState } from 'react';
import axios from 'axios';

function Papago2() {
  const [sentence, setSentence] = useState('');
  const [translateOpt, setTranslateOpt] = useState('ko>en');
  const [translatedText, setTranslatedText] = useState('');

  const handleSentenceChange = (event) => {
    setSentence(event.target.value);
  };

  const handleTranslateOptChange = (event) => {
    setTranslateOpt(event.target.value);
  };

  const translate = (event) => {
    event.preventDefault(); // 기본 동작 중지

    if (sentence === '') {
      alert('번역할 문장을 입력하세요.');
      return;
    }

    const clientId = 'lUmpXs3j1n6tF4ycqdrp'; // 네이버 개발자센터에서 발급받은 CLIENT ID
    const clientSecret = 'ttvQqE7dMc'; // 네이버 개발자센터에서 발급받은 CLIENT SECRET
    const encText = encodeURIComponent(sentence);

    let postvars = '';
    if (translateOpt === 'ko>en') {
      postvars = 'source=ko&target=en';
    }
    if (translateOpt === 'en>ko') {
      postvars = 'source=en&target=ko';
    }
    postvars += '&text=' + encText;

    const url = '/v1/papago/n2mt';

    axios
      .post(url, postvars, {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
          'X-Naver-Client-Id': clientId,
          'X-Naver-Client-Secret': clientSecret,
        },
      })
      .then((response) => {
        const translatedText = response.data?.message?.result?.translatedText;
        if (translatedText) {
          setTranslatedText(translatedText);
        } else {
          throw new Error('번역된 텍스트를 가져올 수 없습니다.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h1>파파고 번역 API</h1>
      <form style={{ margin: 0 }} onSubmit={translate}>
        <select value={translateOpt} onChange={handleTranslateOptChange}>
          <option value="ko>en">한글을 영어로</option>
          <option value="en>ko">영어를 한글로</option>
        </select>
        <input type="text" value={sentence} onChange={handleSentenceChange} />
        <button type="submit">번역</button>
      </form>
      <div>번역된 문장: <b>{translatedText}</b></div>
    </div>
  );
}

export default Papago2;
