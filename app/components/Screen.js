import { useContext, useState } from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BarStyleContext from "../context/barStyle";
import FocusAwareStatusBar from "./FocusAware";



const Screen = ({ children, background, style, colorStyle,barStyle,  ...otherProp }) => {
  // const { barStyle } = useContext(BarStyleContext)
  const insets = useSafeAreaInsets();


  return (
    <SafeAreaView style={[style,{
      
      paddingTop: insets.top,
      
    },]}>
      {children}
      <FocusAwareStatusBar barStyle={barStyle} backgroundColor={ background} />
    </SafeAreaView>
  );
};

export default Screen;
