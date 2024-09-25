import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import AppText from './Text'
import colors from '../config/colors'

export default function OfflineNotice() {
  return (
    <View style={styles.container}>
      <AppText>No internet connection</AppText>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        height: 50,
        position: 'absolute'
    }
})