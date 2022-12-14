import React from "react";
import {View, TextInput, StyleSheet} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { windowHeight, windowWidth } from "../utils/Dimension";

const FormInput = ({labelValue, placeholderText, iconType, ...rest}) => {
    return (
        <View style={styles.inputContainer}>
            <View style={styles.iconStyle}>
                <FontAwesome name={iconType} size={25} color="#666"/>
            </View>
           <TextInput
           numberOfLines={1}
           style={styles.input}
            value={labelValue}
            placeholder = {placeholderText}
            placeholderTextColor="#666"
            {...rest}
           />
        </View>

    )
}

const styles = StyleSheet.create({
    input: {
        padding: 10,
        flex: 1,
        fontSize: 16,
        color: "#333",
        justifyContent: "center",
        alignItems: "center"
    },
    inputField: {
        padding: 10,
        marginTop: 5,
        marginBottom: 10,
        width: windowWidth/1.5,
        height: windowHeight/15,
        fontSize: 16,
        borderRadius: 8,
        borderWidth: 1,
    },
    iconStyle: {
        padding: 10,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderRightColor: "#ccc",
        borderRightWidth: 1,
        width: 50, 
    },
    inputContainer: {
        marginTop: 5,
        marginBottom: 10,
        width: "100%",
        height: windowHeight/15,
        borderColor: "#ccc",
        borderRadius: 3,
        borderWidth: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff"
    }
})

export default FormInput;