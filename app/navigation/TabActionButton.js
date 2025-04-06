import React from "react"
import { StyleSheet, TouchableHighlight } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import colors from "../config/colors"

const TabActionButton = ({ onPress }) => {
    return (
        <TouchableHighlight
            onPress={onPress}
            style={styles.container}
            underlayColor={colors.medium}
        >
            <MaterialCommunityIcons name="plus" style={styles.icon} />
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
         
        
        
        
        
        
        justifyContent: "center",
        
    },
    icon: {
        fontSize: 40,
        color: colors.primary,
    },
})

export default TabActionButton
