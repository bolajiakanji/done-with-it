import React, { useEffect, useState, useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";
import AuthNavigator from "./app/navigation/AuthNavigator";
import TabNavigator from "./app/navigation/TabNavigator";
import theme from "./app/navigation/theme";
import OfflineNotice from "./app/components/OfflineNotice";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BarStyleContext from "./app/context/barStyle";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [user, setUser] = useState(null);
  const [appIsReady, setAppIsReady] = useState(false);
  const [barStyle, setBarStyle] = useState('dark-content')

useEffect(() => {
    prepareApp();
  }, []);
  
  const prepareApp = async () => {
    const owner = await authStorage.getUser();

    if (owner) {

      setUser(owner);
      console.log(owner)
    }
    setAppIsReady(true);
  };
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return;
  }

  return (
    <>
      <View
        style={{ flex: 1, position: 'static' }}
        onLayout={onLayoutRootView}
      >
        <GestureHandlerRootView>
          <BarStyleContext.Provider value={{ barStyle, setBarStyle }}>
            <AuthContext.Provider value={{ user, setUser }}>
              <NavigationContainer
                theme={theme}
              >
                {user ? <TabNavigator /> : <AuthNavigator />}
              </NavigationContainer>
              <OfflineNotice />
            </AuthContext.Provider>
          </BarStyleContext.Provider>
        </GestureHandlerRootView>
      </View>
    </>
  );
};

export default App;
