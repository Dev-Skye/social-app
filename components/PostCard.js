import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const PostCard = ({ item }) => {

  // if(item.likes == 1){
  //  "1 Like"    
  // } else if (item.likes > 1){
  //   item.likes + "likes"
  // }
  return (
    <View style={styles.card}>
      <View style={styles.userInfo}>
        <Image source={item.userImg} style={styles.userImg} />
        <View style={styles.userInfoText}>
          <Text style={styles.userName}>{item.userName}</Text>
          <Text style={{ fontSize: 12, color: "#666" }}>{item.postTime}</Text>
          <Text></Text>
        </View>
      </View>
      <Text style={styles.postText}>{item.post}</Text>
      {item.postImg !== "none" ? (
        <Image source={item.postImg} style={styles.postImg} />
      ) : (
        <View style={styles.divider} />
      )}
      {/* <Image source={require("../assets/post6.jpg")} style={styles.postImg}/> */}
      <TouchableOpacity style={styles.interactionWrapper}>
        <View style={styles.interaction}>
          {item.likes !== "0" ? (
            <Icon name="heart" size={25} color="#2e64e5" />
          ) : (
            <Icon name="heart-outline" size={25} color="black" />
          )}
          {item.likes !== "0" ? (
            <Text style={{color:"#2e64e5", fontSize: 12,
            fontWeight: "bold",
            marginTop: 5,
            marginLeft: 5,}}>{item.likes}</Text>
          ) : (
            <Text style={{color:"#333", fontSize: 12,
            fontWeight: "bold",
            marginTop: 5,
            marginLeft: 5,}}>{item.likes}</Text>
          )}
        </View>

        <View style={styles.interaction}>
          <Icon name="md-chatbubble-outline" size={25} />
          {item.comments !== "0" ? (
            <Text style={{color:"#2e64e5", fontSize: 12,
            fontWeight: "bold",
            marginTop: 5,
            marginLeft: 5,}}>{item.comments} Comment</Text>
          ) : (
            <Text style={{color:"#333", fontSize: 12,
            fontWeight: "bold",
            marginTop: 5,
            marginLeft: 5,}}>{item.comments} Comment</Text>
          )}
         </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  postText: {
    fontSize: 14,
    paddingRight: 15,
    paddingLeft: 15,
  },
  interactionText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
    marginTop: 5,
    marginLeft: 5,
  },
  interactionTextt: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 5,
    marginLeft: 5,
    color: "#2e64e5",
  },
  interactionWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15,
  },
  interaction: {
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 5,
    padding: 3,
  },
  divider: {
    borderWidth: 1,
    borderBottomColor: "#dddddd",
    marginTop: 15,
    width: "90%",
    marginLeft: 17,
  },
  postImg: {
    width: "100%",
    height: 250,

    marginTop: 15,
  },
  text: {
    fontSize: 12,
    color: "#666",
  },
  userInfoText: {
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 10,
  },
  userName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  userInfo: {
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 15,
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  card: {
    backgroundColor: "#e5e4e2",
    width: "100%",
    marginBottom: 10,
    borderRadius: 10,
  },
  text: {
    alignItems: "center",
    fontSize: 20,
    color: "#333333",
  },
});
export default PostCard;
