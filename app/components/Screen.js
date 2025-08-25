import { SafeAreaView } from "react-native-safe-area-context";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FocusAwareStatusBar from "./FocusAware";

const Screen = ({ 
  children, 
  background, 
  style, 
  barStyle  }) => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[style, { paddingTop: insets.top }]}>
      {children}
      <FocusAwareStatusBar barStyle={barStyle} backgroundColor={ background} />
    </SafeAreaView>
  );
};

export default Screen;
