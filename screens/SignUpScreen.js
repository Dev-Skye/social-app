import React, {useState} from "react";
import {View, Text, TouchableOpacity, Image, StyleSheet} from "react-native";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import SocialButton from "../components/SocialButton";
import { auth } from "../firebase";


const SignUpScreen = ({navigation}) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmpassword, setConfirmPassword] = useState();

    const handleSignUp = () => {
        auth.createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log("Registered with", user.email)
        })
        .catch(error => alert(error.message))
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Create an account</Text>
            <FormInput
            labelValue={email}
            onChangeText={(userEmail) => setEmail(userEmail)}
            placeholderText="Email"
            iconType="user"
            keyboardType="email-address"
           autoCapitalize="none"
           autoCorrect={false}
            />
            
            <FormInput
            labelValue={password}
            onChangeText={(userPassword) => setPassword(userPassword)}
            placeholderText="Password"
            iconType="lock"
            secureTextEntry={true}
            />

            <FormInput
            labelValue={confirmpassword}
            onChangeText={(userPassword) => setConfirmPassword(userPassword)}
            placeholderText="Confirm Password"
            iconType="lock"
            secureTextEntry={true}
            />
            <FormButton
            buttonTitle="Sign Up"
            onPress={handleSignUp}
            />

            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>By registering, you confirm that your accept our </Text>
                <TouchableOpacity onPress={() => alert("Terms clicked")}>
                    <Text style={[styles.color_textPrivate, {color: "#e88832"}]}>Terms of service</Text>
                </TouchableOpacity>
                <Text style={styles.color_textPrivate}> and</Text>
                <Text style={[styles.color_textPrivate, {color: "#e88832"}]}> Privacy Policy</Text>
            </View>
            <SocialButton
                buttonTitle="Sign Up with Facebook"
                btnType="facebook"
                color="#4867aa"
                backgroundColor="#ebeaf4"
                onPress={() => {}}
            />

            <SocialButton
                buttonTitle="Sign Up with Google"
                btnType="google"
                color="#de4d41"
                backgroundColor="#f5e7ea"
                onPress={() => {}}
            />

            <TouchableOpacity style={styles.navButton} onPress={()=> navigation.navigate("Login")}>
                <Text style={styles.navButtonText}>Have an account? Sign In</Text>
            </TouchableOpacity>
        
        </View>
    )
}

const styles = StyleSheet.create({
    navButtonText:{
        fontSize: 15,
        fontWeight: "bold",
        margin: 20,
        color: "#0073CF"
    },
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#f9fafd" 
    },
    textPrivate:{
        flexDirection: "row",
        flexWrap: "wrap",
        marginVertical: 35,
        justifyContent: "center"
    },
    color_textPrivate: {
        fontSize: 13,
        fontWeight: "400",
        color: "gray"
    },
    text:{
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 80,
        
    }
})

export default SignUpScreen;