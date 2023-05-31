import React, {useRef, useState, useEffect} from "react";
import classes from "./Inputpin.module.css";
import head from "../images/head.png";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import html2canvas from 'html2canvas';


const firebaseConfig = {
    apiKey: "AIzaSyC_IUaMyr9VhieuRtr4-EVdd8MOHXyjLXM",
    authDomain: "cybersecuritycapstone-c2e14.firebaseapp.com",
    projectId: "cybersecuritycapstone-c2e14",
    storageBucket: "cybersecuritycapstone-c2e14.appspot.com",
    messagingSenderId: "683320376252",
    appId: "1:683320376252:web:28ff4101bb698a32c309b9"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



const Inputpin = () => {

  // const captureImage = async () => {
  //   const video = document.createElement('video');
  //   const constraints = { video: true };

  //   try {
  //     // 웹캠 시작
  //     const stream = await navigator.mediaDevices.getUserMedia(constraints);
  //     video.srcObject = stream;

  //     // 웹캠에서 첫 번째 프레임을 기다립니다.
  //     await new Promise((resolve) => (video.onloadedmetadata = resolve));

  //     // 웹캠에서 프레임을 캡처합니다.
  //     const canvas = document.createElement('canvas');
  //     canvas.width = video.videoWidth;
  //     canvas.height = video.videoHeight;
  //     canvas.getContext('2d').drawImage(video, 0, 0);

  //     // 캡처한 이미지를 저장합니다.
  //     canvas.toBlob((blob) => {
  //       const imageURL = URL.createObjectURL(blob);

  //       // 이미지를 저장할 수 있는 방법에 따라 다르게 처리할 수 있습니다.
  //       // 예를 들어, 서버에 이미지를 업로드하거나, 클라이언트 측에 저장할 수 있습니다.

  //       // 예시: 웹캠으로 캡처한 이미지를 react 프로젝트 폴더에 저장하는 방법
  //       const link = document.createElement('a');
  //       link.href = imageURL;
  //       link.download = 'webcam_capture.png';
  //       link.click();

  //       // 웹캠 종료
  //       stream.getTracks().forEach((track) => track.stop());
  //     });
  //   } catch (error) {
  //     console.error('웹캠 작동 중 오류가 발생했습니다:', error);
  //   }
  // };

  const captureImage = async () => {
    const video = document.createElement('video');
    const constraints = { video: true };
  
    try {
      // 웹캠 시작
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      video.srcObject = stream;
  
      await new Promise((resolve) => {
        video.onloadeddata = () => {
          // 비디오 재생
          video.play().then(() => {
            setTimeout(() => {
              // 웹캠에서 프레임을 캡처합니다.
              const canvas = document.createElement('canvas');
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;
              canvas.getContext('2d').drawImage(video, 0, 0);
  
              // 캡처한 이미지를 저장합니다.
              canvas.toBlob( async (blob) => {
                const imageURL = URL.createObjectURL(blob);
  
  
                // 예시: 웹캠으로 캡처한 이미지를 react 프로젝트 폴더에 저장하는 방법
                const link = document.createElement('a');
                link.href = imageURL;
                link.download = 'webcam_capture.png';
                link.click();
  
                // 웹캠 종료
                stream.getTracks().forEach((track) => track.stop());
                resolve();
              });
            }, 500); // 0.5초 대기
          });
        };
      });
    } catch (error) {
      console.error('웹캠 작동 중 오류가 발생했습니다:', error);
    }
  };
  
  
  


    const [isFullScreen, setIsFullScreen] = useState(false);
    const [enteredPin, setEnteredPin] = useState("");
    const [trueOTP, setTrueOTP] = useState("");

    const toggleFullScreen = () => {
        if (!isFullScreen) {
          document.documentElement.requestFullscreen();
          setIsFullScreen(true);
        } 
        else {
          document.exitFullscreen();
            setIsFullScreen(false);
        }
      };


    // const pinChangeHandler = async (e) => {
    //     await setDoc(doc(db, "data", "pin"), {
    //         pinNumber: e.target.value
    //       });
    //     console.log(e.target.value);
    // };

    const comparePin = async (e) => {
      await setDoc(doc(db, "data", "pin"), {
        pinNumber: e.target.value
      });
        const docRef = doc(db, "data", "pin");
        const docRef2 = doc(db, "data", "OTP")
        const docSnap = await getDoc(docRef);
        const docSnap2 = await getDoc(docRef2);

        if (docSnap.exists()) {
          const nowpin = docSnap.data().pinNumber;
          setEnteredPin(nowpin);
        } else {
          console.log("No such document!");
        }
        if(docSnap2.exists()){
          const nowOTP = docSnap2.data().OTPnum;
          setTrueOTP(nowOTP);
        } else {
          console.log("No such document!");
        }

        console.log(enteredPin);
        console.log(trueOTP);
    };

    const checkGPS = async () => {
      try {
        if (!navigator.geolocation) {
          console.log('Geolocation is not supported by your browser');
          return;
        }
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        // 위도와 경도 추출
        const { latitude, longitude } = position.coords;

        // Firestore에 업로드
        await setDoc(doc(db, "data", "GPS"), {
          lat: latitude,
          long : longitude,
          timestamp: new Date().getTime(),
        });

        console.log('Coordinates uploaded successfully');
      } catch (error) {
        console.log('Error uploading coordinates:', error);
      }
    };

    const checkPin = async (e) => {
      if(e.key === "Enter"){
        if(trueOTP === enteredPin && enteredPin.length > 3 && isFullScreen === true){
          console.log("correct");
          document.exitFullscreen();
        }
        else{
          await setDoc(doc(db, "data", "key"), {
            key_value : false
          });
          captureImage();
          checkGPS();
          console.log("wrong")
          return;
        }
      }
    };

    


    return (
            <div className={classes.pindiv}>
                <img src={head} alt="Park"/>
                <div className={classes.textname}>
                    Park Seong Jun
                </div>
                <input autoFocus className={classes.pin} type="password" onChange={comparePin} onKeyDown={checkPin}/>
                <button className={classes.pinforgetbutton} >
                    PIN 잊음
                </button>
                {!isFullScreen && <button className={classes.pinbutton} onClick={toggleFullScreen} title="START">SECURE START</button>}
            </div>
    );
};

export default Inputpin;