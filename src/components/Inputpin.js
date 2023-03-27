import React, {useState} from "react";
import classes from "./Inputpin.module.css";
import head from "../images/head.png";



const Inputpin = () => {

    const [pinValue, setPinValue] = useState("");

    return (
        <div className={classes.pindiv}>
            <img src={head} alt="Park"/>
            <input className={classes.pin} type="text" />
            <div className={classes.textzone}>
                pin 잊음
            </div>
        </div>
    );
};

export default Inputpin;