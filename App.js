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
import { GestureHandlerRootView } from "react-native-gesture-handler"
//import { navigationRef } from "./app/navigation/rootNavigation"

//SplashScreen.preventAutoHideAsync();


const App = () => {
    const [user, setUser] = useState(null)
    const [appIsReady, setAppIsReady] = useState(false);


    

    useEffect(() => {
        
            
      prepareApp()

    
              
            
    }, [])
    const prepareApp = async () => {
        const owner = await authStorage.getUser()
        console.log(owner+'stupid')
        if (owner) {
        setUser(owner)
        setAppIsReady(true);

    }
    }
    // const onLayoutRootView = useCallback(async () => {
    //     if (appIsReady) {
        
    //       await SplashScreen.hideAsync();
    //     }
    //   }, [appIsReady]);
    
    //   if (!appIsReady) {
    //     return null;
    
    
    console.log(user+ 'fhjjjsok thw user')

    return (
        <View style={{flex:1
        }}
            //onLayout={onLayoutRootView}
        >
                        <GestureHandlerRootView>

            <AuthContext.Provider value={{ user, setUser }}>
                
            {/* <StatusBar style={"auto"} /> */}
                <NavigationContainer
                   // ref={navigationRef}
                    theme={theme}>
                {user ? <TabNavigator /> : <AuthNavigator />}
            </NavigationContainer>
            <OfflineNotice />
            </AuthContext.Provider>
            </GestureHandlerRootView>
            </View>
    )
}

export default App
