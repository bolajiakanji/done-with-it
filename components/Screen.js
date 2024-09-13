import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

const Screen = ({ children, color, style, ...otherProp }) => {
  return (
    <SafeAreaView style={style}> 
      {children}
          <StatusBar style={color} {...otherProp} />
    </SafeAreaView>
  );
};

export default Screen;
