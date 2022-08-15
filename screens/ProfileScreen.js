import { useNavigation } from "@react-navigation/native";
import React from "react";
import {View, Text, StyleSheet} from "react-native";
import FormButton from "../components/FormButton";
import {auth} from "../firebase";


const ProfileScreen = () => {
    const navigation = useNavigation();
    const handleSignOut = () => {
        auth
        .signOut()
        .then(() => {
            navigation.replace("Login")
        })

        .catch(error => alert(error.message))
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome {auth.currentUser?.email} </Text>
            <FormButton buttonTitle="Sign Out" onPress={handleSignOut}/>
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
export default ProfileScreen;