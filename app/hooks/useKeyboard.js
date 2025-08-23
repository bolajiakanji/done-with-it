import { useEffect } from "react";
import { Keyboard } from "react-native";

const useKeyboard = (setVisibility) => {
useEffect(() => {
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setVisibility(false)
    })
    return () => { hideSubscription.remove() }
  }, []);

}

export default useKeyboard