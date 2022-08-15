import React from "react";
import {View, Text, StyleSheet, FlatList} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import PostCard from "../components/PostCard";

const Posts = [
  {
  id: "1",
  userName: "Jenny Doe",
  userImg: require("../assets/user1.jpg"),
  postTime: "4 mins ago",
  post: "Hey there, this is my test for a post of my social app in React Native",
  postImg: require("../assets/post6.jpg"),
  liked: true,
  likes: "14 likes",
  comments: "5"
},

{
  id: "2",
  userName: "Shirley Doe",
  userImg: require("../assets/user2.jpg"),
  postTime: "2 hours ago",
  post: "Hey there, this is my test for a post of my social app in React Native",
  postImg: require("../assets/post2.jpeg"),
  likes: "0",
  liked: false,
  comments: "0"
},

{
  id: "3",
  userName: "Michelle Mark",
  userImg: require("../assets/user3.jpg"),
  postTime: "1 hour ago",
  post: "Hey there, this is my test for a post of my social app in React Native",
  postImg: "none",
  liked: true,
  likes: "3 likes",
  comments: "1"
},
{
  id: "4",
  userName: "Selina Paul",
  userImg: require("../assets/user4.jpg"),
  postTime: "3 hours ago",
  post: "Hey there, this is my test for a post of my social app in React Native",
  postImg: require("../assets/post4.jpg"),
  likes: "11 likes",
  liked: true,
  comments: "7"
},

{
  id: "5",
  userName: "Skye Tech",
  userImg: require("../assets/user5.jpg"),
  postTime: "10 mins ago",
  post: "Hey there, this is my test for a post of my social app in React Native",
  postImg: "none",
  likes: "0",
  liked: false,
  comments: "1"
},

{
  id: "6",
  userName: "Abel Gomez",
  userImg: require("../assets/user6.jpg"),
  postTime: "4 hours ago",
  post: "Hey there, this is my test for a post of my social app in React Native",
  postImg: require("../assets/post1.jpg"),
  likes: "11 likes",
  liked: true,
  comments: "0"
},


]

const HomeScreen = ({navigation}) => {
    
    return (
        <View style={styles.container}>
          <FlatList 
            data={Posts}
            renderItem={({item}) => <PostCard item={item}/>}
            keyExtractor={item=>item.id}
            showsVerticalScrollIndicator={false}
          />
            <ActionButton buttonColor="#2e64e5" onPress={()=>navigation.push("Post")}>
            <Icon name="add" style={styles.actionButtonIcon} />
        </ActionButton>
            </View>
            )
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#f9fafd",
        padding: 20,
        alignItems: "center"
    },
    postText:{
      fontSize: 14,
      paddingRight: 15,
      paddingLeft: 15
    },
    interactionText:{
      fontSize: 12,
      fontWeight: "bold",
      color: "#333",
      marginTop: 5,
      marginLeft: 5
    },
    interactionTextt:{
      fontSize: 12,
      fontWeight: "bold",
      color: "#333",
      marginTop: 5,
      marginLeft: 5,
      color: "#2e64e5"
    },
    interactionWrapper:{
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 15
    },
    interaction:{
      flexDirection: "row",
      justifyContent: "center",
      borderRadius: 5,
      padding: 3,
    },
    divider:{
      borderWidth: 1,
      borderBottomColor: "#dddddd",
      marginTop: 15,
      width: "90%",
      marginLeft: 17

    },
    postImg:{
      width: "100%",
      height: 300,
      marginTop: 15
    },
    text:{
      fontSize:12,
      color: "#666"
    },
    userInfoText:{
      flexDirection: "column",
      justifyContent:"center",
      marginLeft:10
    },
    userName:{
      fontSize: 14,
      fontWeight:"bold"
    },
    userInfo:{
      flexDirection: "row",
      justifyContent: "flex-start",
      padding: 15
    },
    userImg:{
      width: 50,
      height: 50,
      borderRadius: 25
    },
    card: {
      backgroundColor: "#e5e4e2",
      width: "100%",
      marginBottom: 10,
      borderRadius: 10, 
      
    },
    text:{
        alignItems: "center",
        fontSize: 20,
        color: "#333333"
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
      },
})
export default HomeScreen;