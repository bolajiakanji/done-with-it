import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import AppText from './Text'
import colors from '../config/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNetInfo } from '@react-native-community/netinfo'

export default function OfflineNotice() {
    const netInfo = useNetInfo()

    if (netInfo.isInternetReachable === false && netInfo.type !== 'unknown')
  return (
    <SafeAreaView style={styles.container}>
      <AppText style={styles.text}>No internet connection</AppText>
    </SafeAreaView>
        )
    
    return null
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        height: 50,
        position: 'absolute',
        zIndex: 3,
        alignItems: 'center',
        justifyContent: 'center'

    },
    text: {
        color: colors.white

    }
})
