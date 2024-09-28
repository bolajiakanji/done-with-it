import React, { useEffect, useState, useCallback } from "react"
0
import { StatusBar } from "expo-status-bar"
import { NavigationContainer } from "@react-navigation/native"
import { jwtDecode } from "jwt-decode"
import * as SplashScreen from 'expo-splash-screen';
import { View } from "react-native"


import  AuthNavigator from "./app/navigation/AuthNavigator"
import TabNavigator  from "./app/navigation/TabNavigator"
import theme from "./app/navigation/theme"
import OfflineNotice from "./app/components/OfflineNotice"
import AuthContext from "./app/auth/context"
import authStorage from "./app/auth/storage"
//import { navigationRef } from "./app/navigation/rootNavigation"

//SplashScreen.preventAutoHideAsync();


const App = () => {
    const [user, setUser] = useState(null)
    const [appIsReady, setAppIsReady] = useState(false);


    const prepareApp = async () => {
        const user = await authStorage.getUser()
        if (user) {
        setUser(user)
        setAppIsReady(true);

    }
    }

    useEffect(() => {
        
            
      prepareApp()

    
              
            
    }, [])
    // const onLayoutRootView = useCallback(async () => {
    //     if (appIsReady) {
        
    //       await SplashScreen.hideAsync();
    //     }
    //   }, [appIsReady]);
    
    //   if (!appIsReady) {
    //     return null;
    
    
    console.log(user)

    return (
        <View style={{flex:1
        }}
            //onLayout={onLayoutRootView}
        >
        <AuthContext.Provider value={{ user, setUser }}>
            {/* <StatusBar style={"auto"} /> */}
                <NavigationContainer
                   // ref={navigationRef}
                    theme={theme}>
                {user ? <TabNavigator /> : <AuthNavigator />}
            </NavigationContainer>
            <OfflineNotice />
            </AuthContext.Provider>
            </View>
    )
}

export default App
