

import { Text, StyleSheet } from 'react-native'
import Constants from 'expo-constants'

const AppText = ({ children, ...appStyle }) => {
  return (
    <Text style={[styles.text, appStyle.style]}  >{children}</Text>
  )
}


const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: 'white',
    
    }
})
export default AppText
