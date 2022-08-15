import React from "react";
import {View, Text, StyleSheet} from "react-native";


const ChatScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>ChatScreen</Text>
            </View>
    )
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#f9fafd",
        padding: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    text:{
        alignItems: "center",
        fontSize: 20,
        color: "#333333"
    }
})
export default ChatScreen;