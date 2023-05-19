import React,{useEffect} from 'react';
import Inputpin from './components/Inputpin';



function App() {


  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.keyCode !== 8 && (e.keyCode < 48 || e.keyCode > 57)) {
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };



  // useEffect(() => {
  //   const handlekeypress = (e) => {
  //     const allowedkey = ['a', 'b', 'c', 'fn','esc'];

  //     if(!allowedkey.includes(e.key)) {
  //       e.preventDefault();
  //     }
  //   };
  //   window.addEventListener('keydown', handlekeypress);
  //   return () => {
  //     window.removeEventListener('keydown', handlekeypress);
  //   }
   }, []);



  return (
    <div>
      <Inputpin />
    </div>
  );
}

export default App;
