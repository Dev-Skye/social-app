import firestore from '@react-native-firebase/firestore';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import Icon from "react-native-vector-icons/Ionicons"
import ActionButton from "react-native-action-button";
import React,{useEffect, useState, useContext} from "react";
import {View, Text, StyleSheet, TextInput, Platform, TouchableOpacity, Button, Image, ActivityIndicator, Alert} from "react-native";
import storage from "@react-native-firebase/storage";
import * as Firebase from "firebase";
import * as ImagePicker from "expo-image-picker";
import {firebase} from "../firebase";
import {Camera} from "expo-camera";
import Camerapicker from "../components/camera";
import { Divider } from 'react-navigation-header-buttons';
import {auth} from "../firebase";


const PostScreen = ({navigation}) => {


    if(!Firebase.apps.length){
        Firebase.initializeApp(firebase)
    }

    const renderContent = () => (
        <View
          style={{
            backgroundColor: 'white',
            padding: 16,
            height: 450,
          }}
        >
          <Text >Swipe down to close</Text>
          <TouchableOpacity style={styles.buttonnn} onPress={() => navigation.push("Camera")}>
        <View style={{flexDirection: "row", }}>
        <Icon name="camera" size={25} color="#463E3F"/>
          <Text style={styles.buttontext}>   Take a photo</Text>
        </View>
        </TouchableOpacity>

          <Divider/>
        <TouchableOpacity style={styles.buttonnn} onPress={pickImage}>
        <View style={{flexDirection: "row",}}>
            <Icon name="image" size={25} color="#463E3F"/>
          <Text style={styles.buttontext}>  Gallery</Text>
        </View>
        </TouchableOpacity>
            
        </View>
      );

      const sheetRef = React.useRef(null);

    
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false)
  useEffect(()=> {
      (async () => {
          if(Platform.OS !== "web"){
              const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
              if (status !== "granted") {
                  alert("Sorry, we need camera roll permissions to make this work");
              }
          }
      })();
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
}

const submitPost = async () => {
  const imageUrl = await uploadImage();
  console.log('Image Url: ', imageUrl);

  firestore()
  .collection('posts')
  .add({
    userId,
    post,
    postImg,
    postTime,
    likes,
    comments,
  })
}
const uploadImage = async ()=>{
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
          resolve(xhr.response);
        };
        xhr.onerror = function() {
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', image, true);
        xhr.send(null);
      });

      const ref = Firebase.storage().ref().child(new Date().toISOString())
      const snapshot = ref.put(blob)

      snapshot.on(Firebase.storage.TaskEvent.STATE_CHANGED,()=>{
            setUploading(true)
      },
      (error) => {
          setUploading(false)
          console.log(error)
          blob.close()
          return;
      }, 
      ()=>{
          snapshot.snapshot.ref.getDownloadURL().then((url) => {
              setUploading(false)
              console.log("download url : ", url)
              blob.close();
              return url;
          })
      }
      )
};
 

return(
    <View style={styles.container}>
        <BottomSheet
        ref={sheetRef}
        snapPoints={[450, 300, 0]}
        borderRadius={10}
        renderContent={renderContent}
      />
        <View style={styles.inputWrapper}>
        <TextInput
           placeholder="What's on your mind?"
           fontSize={23}
           multiline
           numberOfLines={4}
           />
            <Image source={{uri: image}} style={{width: 300, height: 300, marginBottom: 20}}/>
            {
              !uploading ?
              <TouchableOpacity onPress={submitPost}>
           <View style={styles.submitBtn}>
               <Text style={styles.submitBtnText}>Post</Text>
           </View>
           </TouchableOpacity> : <ActivityIndicator size={25} color="#000"/>
 }
            
            {/* <TouchableOpacity style={styles.buttonnn} onPress={() => navigation.push("Camera")}>
        <View style={{flexDirection: "row", }}>
        <Icon name="camera-outline" size={25} color="white"/>
          <Text style={styles.buttontext}>   Take Photo</Text>
        </View>
        </TouchableOpacity>


        <TouchableOpacity style={styles.buttonnext} onPress={pickImage}>
        <View style={{flexDirection: "row",}}>
            <Icon name="image-outline" size={25} color="white"/>
          <Text style={styles.buttontext}>  Gallery</Text>
        </View>
        </TouchableOpacity>
            
          {
              !uploading ?
              <TouchableOpacity onPress={uploadImage}>
           <View style={styles.submitBtn}>
               <Text style={styles.submitBtnText}>Post</Text>
           </View>
           </TouchableOpacity> : <ActivityIndicator size={25} color="#000"/>
 }  */}
                 </View>
         <ActionButton>
            <ActionButton.Item
                buttonColor="#9b59b6"
                title="Add Photo"
                onPress={()=> sheetRef.current.snapTo(0)}>
                <Icon name="camera-outline" style={styles.actionButtonIcon} size={25}/>
            </ActionButton.Item>
            {/* <ActionButton.Item
                buttonColor="#3498db"
                title="Choose Photo"
                onPress={pickImage}>
                <Icon name="images" style={styles.actionButtonIcon} size={25}/>
            </ActionButton.Item> */}
           </ActionButton> 
    </View>
)
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button:{
        marginTop: 30,
        padding: 10,
        width: 80,
        height: 20
    },
    addImage:{
        width: "100%",
        height: 250,
        marginBottom: 15
    },
    statusWrapper:{
        justifyContent: "center",
        alignItems: "center"
    },
    submitBtn:{
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "#2e64e515",
        borderRadius: 5,
        padding: 10
    },
    submitBtnText:{
        fontSize: 18,
        fontWeight: "bold",
        color: "#2e64e5"
    },
    inputWrapper:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: 20,
        backgroundColor: "#2e64e515"
    },
    buttonnn: {
        padding: 15,
        width: 200,
        alignItems: "center",
        borderRadius: 24,
        marginBottom: 10,
        alignItems: "flex-start",
      },
      buttonnext: {
        padding: 16,
        width: 200,
        alignItems: "center",
        borderRadius: 24,
        backgroundColor: "#2e64e5",
        marginBottom: 40,
        marginLeft: 20,
      },
      buttontext: {
        color: "grey",
        fontSize: 15,
        fontWeight: "bold"
      },
    inputField: {
        justifyContent: "center",
        alignItems: "center",
        fontSize: 24,
        textAlign: "center",
        width: "90%"
    },
    header: {
        backgroundColor: "#FFFFFF",
        shadowColor: "#333333",
        shadowOffset: {width: -1, height: -3},
        shadowRadius: 2,
        shadowOpacity: 0.4,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader:{
        alignItems: "flex-start",
    },
    panelHandle:{
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#00000040",
        marginBottom: 10
    },
});

export default PostScreen;