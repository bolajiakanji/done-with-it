import React, { useEffect, useState, useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { StyleSheet, View } from "react-native";
import AuthNavigator from "./app/navigation/AuthNavigator";
import TabNavigator from "./app/navigation/TabNavigator";
import theme from "./app/navigation/theme";
import OfflineNotice from "./app/components/OfflineNotice";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [user, setUser] = useState(null);
  const [appIsReady, setAppIsReady] = useState(false);

  const getUserObj = { appIsReady, setAppIsReady, setUser }
  const onLayoutRootView = useGetUser(getUserObj)

  if (!appIsReady) {
    return;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <GestureHandlerRootView>
        <AuthContext.Provider value={{ user, setUser }}>
          <NavigationContainer theme={theme}>
            {user ? <TabNavigator /> : <AuthNavigator />}
          </NavigationContainer>
          <OfflineNotice />
        </AuthContext.Provider>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'static'
  }
})

const useGetUser = (getUserObj) => {
  const { appIsReady, setAppIsReady, setUser } = getUserObj

  useEffect(() => {
    prepareApp();
  }, []);

  const prepareApp = async () => {
    const owner = await authStorage.getUser();
    if (owner) setUser(owner);
    setAppIsReady(true);
  };

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) await SplashScreen.hideAsync();
  }, [appIsReady]);
  return onLayoutRootView
}

export default App;
