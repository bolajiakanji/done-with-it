import React from 'react';
import LottieView from 'lottie-react-native';
import { View, StyleSheet } from 'react-native';

function ActivityIndicator({visible = false}) {
    if (!visible) return null

    return (
        <View style={styles.overlay}>
        <LottieView 
            autoPlay
            source={require('../assets/animations/loader.json')}
            />
            </View>
    )
}

const styles = StyleSheet.create({
    overlay: {
        backgroundColor: 'white',
        height: '100%',
        width: '100%',
        position: 'absolute',
        zIndex: 2
    }

})


export default ActivityIndicator;