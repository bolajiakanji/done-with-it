import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

const Screen = ({ children, statusBarColor, style, ...otherProp }) => {
  return (
    <SafeAreaView style={style}> 
      {children}
          <StatusBar style={statusBarColor} {...otherProp} />
    </SafeAreaView>
  );
};

export default Screen;
