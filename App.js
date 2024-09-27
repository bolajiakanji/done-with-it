import React, { useEffect, useState } from "react"
import AppLoading from "expo-app-loading"
import { StatusBar } from "expo-status-bar"
import { NavigationContainer } from "@react-navigation/native"
import { jwtDecode } from "jwt-decode"
import * as SplashScreen from 'expo-splash-screen';
import { View } from "react-native"


import { AuthNavigator, TabNavigator } from "./app/navigation"
import navigationTheme from "./app/navigation/theme"
import OfflineNotice from "./app/components/OfflineNotice"
import AuthContext from "./app/auth/context"
import authStorage from "./app/auth/storage"
import { navigationRef } from "./app/navigation/rootNavigation"

SplashScreen.preventAutoHideAsync();


const App = () => {
    const [user, setUser] = useState(null)
    const [appIsReady, setAppIsReady] = useState(false);


    const prepareApp = async () => {
        const token = await authStorage.getToken()
        if (!token) return;
        setUser(jwtDecode(token))
        setAppIsReady(true);


    }

    useEffect(() => {
        
            
                prepareApp()

    
              
            
    }, [])
    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
        
          await SplashScreen.hideAsync();
        }
      }, [appIsReady]);
    
      if (!appIsReady) {
        return null;
      }
    
    

    return (
           <View onLayout={onLayoutRootView} >
        <AuthContext.Provider value={{ user, setUser }}>
            <StatusBar style={"auto"} />
            <NavigationContainer ref={navigationRef} theme={navigationTheme}>
                {user ? <TabNavigator /> : <AuthNavigator />}
            </NavigationContainer>
            <OfflineNotice />
            </AuthContext.Provider>
            </View>
    )
}

export default App
