import React, {useState} from "react";
import classes from "./Inputpin.module.css";
import head from "../images/head.png";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";


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

    const checkPin = (e) => {
      if(e.key === "Enter"){
        if(trueOTP === enteredPin && enteredPin.length > 3 && isFullScreen === true){
          console.log("correct");
          document.exitFullscreen();
        }
        else{
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
                <input className={classes.pin} type="password" onChange={comparePin} onKeyDown={checkPin}/>
                <button className={classes.pinforgetbutton} >
                    PIN 잊음
                </button>
                {!isFullScreen && <button className={classes.pinbutton} onClick={toggleFullScreen} title="START">START</button>}
            </div>
    );
};

export default Inputpin;