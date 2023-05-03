import React,{useEffect} from 'react';
import Inputpin from './components/Inputpin';
import classes from './App.module.css';
import screenfull from 'screenfull';


function App() {


  // useEffect(() => {
  //   const handlekeypress = (e) => {
  //     const allowedkey = ['a', 'b', 'c', 'fn', 'f'];

  //     if(!allowedkey.includes(e.key)) {
  //       e.preventDefault();
  //     }
  //   };
  //   window.addEventListener('keydown', handlekeypress);
  //   return () => {
  //     window.removeEventListener('keydown', handlekeypress);
  //   }
  // }, []);

  return (
    <div className={classes.fullscreen}>
      <Inputpin />
    </div>
  );
}

export default App;
