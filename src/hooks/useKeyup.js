// reasoning for using keyup instead of keydown: mimics the cookie being clicked like the mouse, 
// or else the spacebar can just be held down and it will up the counts of cookies
import { useEffect } from "react";

const useKeyup = (code, callback) => {
    useEffect(() => {
        const handleKeyup = (event) => {
          event.preventDefault();
          if (event.code === code) {
            callback();
          }
        };
    
        window.addEventListener("keyup", handleKeyup);
        return () => {
          window.removeEventListener("keyup", handleKeyup);
        };
      }, [code, callback]);

};

export default useKeyup;
