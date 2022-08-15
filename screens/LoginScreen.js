import React, {useState, useEffect, usePermissions} from "react";
import {View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator} from "react-native";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import SocialButton from "../components/SocialButton";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import * as Google from "expo-google-app-auth";
//import FBSDK,{ LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
//import { AccessToken } from "react-native-fbsdk";
import * as Facebook from "expo-facebook";


const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [googleSubmitting, setGoogleSubmitting] = useState(false);

    
    useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
            if(user) {
                navigation.replace("Home")
            }
        })
        return unsubscribe;
    }, []);

    const handleLogin = () => {
        auth
        .signInWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log("Logged in with", user.email)
        })
        .catch(error => alert(error.message))
    }
    const handleMessage = (message, type = "FAILED") => {
        setMessage(message);
        setMessageType(type);
    }

    // const fbLogin = (resCallback) => {
    //   LoginManager.logOut();
    //     return LoginManager.logInWithPermissions(["email", "public_profile" ]).then(
    //         result => {
    //             console.log("fb result==>>>>>>", result);
    //             if(result.declinedPermissions && result.declinedPermissions.includes("email")){
    //                 resCallback({message: "Email is required"})
    //             }
    //             if(result.isCancelled){
    //                 console.log("error")
    //             } else {
    //                 const infoRequest = new GraphRequest(
    //                     "/me?fileds=email,name,picture,friend",
    //                     null,
    //                     resCallback
    //                 );
    //                 new GraphRequestManager().addRequest(infoRequest).start()
    //             }
    //         },
    //         function(error){
    //             console.log("Login failed with error:" + error)
    //         }
    //     )
    // }
    // const _responseInfoCallBack = async (error, result) => {
    //     if(error){
    //         console.log("error top:", error)
    //     } else {
    //         const userData = result
    //         console.log("fb data*****", userData)
    //     }
    // }

    // const onFbLogin = async () => {
    //     try {
    //         await fbLogin(_responseInfoCallBack)
    //      } catch(error) {
    //          console.log("error raised", error)
    //      }
    //  }

    // const signFB = () => {
    //     LoginManager.logInWithPermissions([
    //         'public_profile', 'email'
    //     ]).then(login => {
    //         if(login.isCancelled) {
    //             setLoadFalse();
    //         } else{
    //             AccessToken.getCurrentAccessToken().then(data => {
    //                 const token = data?.accessToken.toString();
    //                 if(token) getInfoFromToken(token);
    //             });
    //         }
    //     }, error => {
    //         console.error(error);
    //     })
    // }
    
    
  async function fbLogIn() {
    try {
      await Facebook.initializeAsync({
        appId: '<APP_ID>',
      });
      const { type, token, expirationDate, permissions, declinedPermissions } =
        await Facebook.logInWithReadPermissionsAsync({
          permissions: ['public_profile'],
        });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }


    
    const handleGoogleSignin = () => {
        setGoogleSubmitting(true);
        const config = {
            androidClientId: `1019839064205-fbkc2jard2m9mf8nlch1slhpi5dasi1a.apps.googleusercontent.com`,
            scopes: ["profile", "email"]
        };
        Google
        .logInAsync(config)
        .then((result) => {
            const{type, user} = result;
            
            if(type == "success"){
                const{email, name, photoUrl} = user;
                handleMessage("Google signin was successful", "SUCESS")
                setTimeout(() => navigation.navigate("Welcome", {email, name, photoUrl}), 1000)
            } else {
                handleMessage("Google signin was cancelled")
            }
            setGoogleSubmitting(false);
        })
        .catch(error => {
            console.log(error);
            handleMessage("An error occured. Check your network and try again")
            setGoogleSubmitting(false);
        })
    }

    return (
        <View style={styles.container}>
            <Image 
            source={require("../assets/logo.png")}
            style={styles.logo}
            />
            <Text style={styles.text}>Social App</Text>
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

            <FormButton
            buttonTitle="Sign In"
            onPress={handleLogin}
            />

            <TouchableOpacity style={styles.forgotButton} onPress={()=>{}}>
                <Text style={styles.navButtonText}>Forgot Password?</Text>
            </TouchableOpacity>
            
            
             <SocialButton
                buttonTitle="Sign In with Facebook"
                btnType="facebook"
                color="#4867aa"
                backgroundColor="#ebeaf4"
               onPress={fbLogIn}
              // onPress={() => onFacebookButtonPress().then(() => console.log('Signed in with Facebook!'))}
            /> 

            {!googleSubmitting && <SocialButton
                buttonTitle="Sign In with Google"
                btnType="google"
                color="#de4d41"
                backgroundColor="#f5e7ea"
                onPress={handleGoogleSignin}
            />
           }
           {googleSubmitting && (
               <SocialButton
               btnType="google"
               disabled={true}
               color="#de4d41"
               backgroundColor="#f5e7ea"
               text="Loading..."
               />
               
           )}

            <TouchableOpacity style={styles.forgotButton} onPress={()=> navigation.navigate("SignUp")}>
                <Text style={styles.navButtonText}>Don't have an account? Create Here</Text>
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
    logo:{
        height: 150,
        width: 150,
        resizeMode: "cover"
    },
    text:{
        fontSize: 25,
        color: "black",
        fontWeight: "bold",
        marginBottom: 5,
        
    }
})

export default LoginScreen;