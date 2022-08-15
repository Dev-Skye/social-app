//import com.facebook.FacebookSdk;
//import com.facebook.appevents.AppEventsLogger;



import React from "react";
import {View, Text, Button, StyleSheet, Image, TouchableOpacity} from "react-native";
import Onboarding from "react-native-onboarding-swiper";

const Skip = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal: 15}}
        {...props}
        >
        <Text style={{fontSize: 16}}>Skip</Text>
        </TouchableOpacity>
);

const Next = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal: 15}}
        {...props}
        >
        <Text style={{fontSize: 16}}>Next</Text>
        </TouchableOpacity>
);

const Done = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal: 15}}
        {...props}
        >
        <Text style={{fontSize: 16}}>Done</Text>
        </TouchableOpacity>
);

const Dots = ({selected}) => {
let backgroundColor;
backgroundColor = selected ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.3)";
return (
    <View style={{
        width: 5, height: 5, marginHorizontal: 3, backgroundColor,
    }}/>
)
}
const OnboardingScreen = ({navigation}) => {
    return (
        <Onboarding
        DotComponent={Dots}
        NextButtonComponent={Next}
        SkipButtonComponent={Skip}
        DoneButtonComponent={Done}
        onSkip={() => navigation.replace("Login")}
        onDone={() => navigation.navigate("Login") }
  pages={[
    {
      backgroundColor: '#ffe5b4',
      image: <Image source={require('../assets/pics1.jpeg')} style={{
          resizeMode: "cover", height: "70%", width: "70%", 
          borderRadius: 30, shadowOpacity: 2, shadowColor: "black",
        shadowRadius: 5, shadowOffset: {height: 5, width: 3}, 
        }}/>,
      title: 'Tick & Talk',
      subtitle: 'Mingle if you are single!',
    },
    {
        backgroundColor: '#b0e0e6',
        image: <Image source={require('../assets/pics2.jpg')} 
        style={{
            resizeMode: "cover", height: "70%", width: "50%", 
            borderRadius: 30, shadowOpacity: 2, shadowColor: "black",
          shadowRadius: 5, shadowOffset: {height: 5, width: 10},  }}
        />,
        title: 'Meet & Greet',
        subtitle: 'Done with work? Meet, greet and be happy',
      },

  ]}
/>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})

export default OnboardingScreen;