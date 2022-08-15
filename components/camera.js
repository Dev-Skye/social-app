import React, {useState, useEffect, useRef} from "react";
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Modal, Image } from "react-native";
import { Camera } from "expo-camera";
import FontAwesome from "react-native-vector-icons/FontAwesome"


export default function Camerapicker() {
    const [image, setImage] = useState("");
    const camRef = useRef(null);
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const [open, setOpen] = useState(false);

    
    useEffect(() => {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
  
    if (hasPermission === null) {
      return <View />;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }

    async function takePicture(){
        if(camRef){
            const data = await camRef.current.takePictureAsync();
            setCapturedPhoto(data.uri)
            setOpen(true)
            console.log(data);
            if (!data.cancelled) {
                setCapturedPhoto(data.uri);
              }
        }
    }

    return (
<SafeAreaView style={styles.container}>
  <Camera style={styles.camera} type={type} ref={camRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}>
              <Text style={styles.text}> Flip </Text>
            </TouchableOpacity>
          </View>
        </Camera>
        <TouchableOpacity style={styles.iconButton} onPress={takePicture}>
            <FontAwesome name="camera" size={23} color="#fff"/>
        </TouchableOpacity>

        {capturedPhoto && 
                <Modal
                animationType="slide"
                transparent={false}
                visible={open}
                >
                <View style={{flex: 1, justifyContent:"center", alignItems: "center", margin: 20}}>
                <TouchableOpacity style={{margin: 10,}} onPress={() => setOpen(false)}>
                        <FontAwesome name="window-close" size={50} color="red"/>
                </TouchableOpacity>
                    <Image
                        style={{width: "100%", height: 300, borderRadius: 20}}
                        source={{uri: capturedPhoto}}
                    />
                    
                    
              <TouchableOpacity onPress={()=>{}}>
           <View style={styles.submitBtn}>
               <Text style={styles.submitBtnText}>Post</Text>
           </View>
           </TouchableOpacity> 
                </View>
                
                </Modal>
            }
      </SafeAreaView>
    );
  }

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center"
    },
    iconButton:{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#121212",
         margin: 20,
          borderRadius: 10,
          height: 50,
    },
    flip:{
        fontSize:20,
        marginBottom: 13,
        color:"#fff",
    },
    button:{
        position:"absolute",
        bottom:20,
        left:20
    },
    buttonContainer:{
        flex:1,
        backgroundColor:"transparent",
        flexDirection:"row"
    },
    camera:{
        flex:1,
        aspectRatio: 0.8
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
})
