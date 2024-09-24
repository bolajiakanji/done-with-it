// import React from 'react'
// import ListingEditScreen from './app/screens/ListingEditScreen'
// import { NavigationContainer } from '@react-navigation/native'
// import AuthNavigator from './app/navigation/AuthNavigator'
// import AppNavigator from './app/navigation/AppNavigator'

// const App = () => {
//   return (
//     <NavigationContainer>
//       <AppNavigator />
//     </NavigationContainer>
//   )
// }

// export default App

import React from "react";
import NetInfo from '@react-native-community/netinfo';


import { View, Text } from 'react-native'
import React from 'react'

export default function App() {
  NetInfo.fetch.then(netinfo =>console.log(netinfo))
  return (
    <View>
      <Text>App</Text>
    </View>
  )
}