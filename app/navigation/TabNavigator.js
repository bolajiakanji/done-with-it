import React, { useEffect } from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import AccountNavigator from "./AccountNavigator"
import FeedNavigator from "./FeedNavigator"
import ListingEditScreen from "../screens/ListingEditScreen"
import TabActionButton from "./TabActionButton"
import Routes from "./routes"
//import pushTokenApi from "../api/expoPushToken"
//import { useNotifications } from "../hooks"
//import Navigation from "../navigation/rootNavigation"

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
    

    

    

    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Feed"
                component={FeedNavigator}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <MaterialCommunityIcons
                            name="home"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="ListingEdit"
                component={ListingEditScreen}
                options={({ navigation }) => ({
                    tabBarButton: () => (
                        <TabActionButton 
                            onPress={() =>
                                navigation.navigate(Routes.LISTING_EDIT)
                            }
                        />
                    ), headerShown: false
                })}
            />
            <Tab.Screen
                name="Account"
                component={AccountNavigator}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <MaterialCommunityIcons
                            name="account"
                            size={size}
                            color=''
                        />
                    ),
                    headerShown: false
                }}
            />
        </Tab.Navigator>
    )
}
export default TabNavigator
