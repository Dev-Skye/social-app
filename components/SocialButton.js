import React from "react";
import { Text, TouchableOpacity, View, StyleSheet} from "react-native";
import {windowHeight, windowWidth} from "../utils/Dimension";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const SocialButton = ({
    buttonTitle, 
    btnType, 
    color, 
    backgroundColor, 
    text,
    ...rest
}) => {

    let bgColor = backgroundColor;
    return (
        <TouchableOpacity style={[styles.buttonContainer, {backgroundColor: bgColor}]} {...rest}>
            <View style={styles.iconWrapper}>
                <FontAwesome name={btnType} size={22} color={color} style={styles.icon}/>
            </View>
            <View style={styles.btnTxtWrapper}>
            <Text style={[styles.buttonText, {color: color}]}>{buttonTitle}</Text>
            <Text style={[styles.buttonTextt, {color: color}]}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 10,
        width: "100%",
        height: windowHeight / 15,
        backgroundColor: "#2e64e5",
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 3,
        flexDirection: "row"
    },

    buttonText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "white",
    },
    buttonTextt: {
        fontSize: 10,
        fontWeight: "bold",
        color: "white",
        marginBottom: -13
    },
    iconWrapper: {
        width: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    icon: {
        fontWeight: "bold"
    },
    btnTxtWrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

    },
})

export default SocialButton;