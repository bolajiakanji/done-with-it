
import { Platform, StyleSheet, View,Text } from 'react-native';
 import { StatusBar } from 'expo-status-bar';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppText from './components/AppText';
import Constants from 'expo-constants'
import Screen from './components/Screen';


export default function App() {

  
  return (
    
    
        
    < Screen style={{backgroundColor: 'purple', flex: 1}} statusBarColor='light'>
    <AppText style={{color: 'white'}}>dfgsghhsfhsgdvcsvvvvvxvvverhbolaji</AppText>
    </Screen >
   
      
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50 + Constants.statusBarHeight ,

    
    height: 50,
    backgroundColor: 'purple',
    
   // paddingLeft: 220,
    justifyContent: 'space-between',
    alignItems: '',
    flexDirection: 'row'
    

    

    
    
    
    
    
  },

  mine: {
    width: 50,
    height: 50,
    borderRadius: 35,
    backgroundColor: 'yellow',
    paddingLeft: 20,
  }
});
