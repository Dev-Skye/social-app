import { createStackNavigator } from '@react-navigation/stack';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import {View, Text, TouchableOpacity} from "react-native";
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import PostScreen from "../screens/AddPostScreen"
import { useNavigation } from '@react-navigation/native';
import Camerapicker from "../components/camera";


const HomeStack = createStackNavigator();
const Tabs = createBottomTabNavigator();


const RootStackScreen = ({navigation})  => (
  <HomeStack.Navigator>
        <HomeStack.Screen name="OnBoarding" component={OnboardingScreen} options = {{header: () => null}}/>
        <HomeStack.Screen name="Login" component={LoginScreen} options = {{header: () => null}}/>
        <HomeStack.Screen name="SignUp" component={SignUpScreen} options = {() => ({
              title:"",
              headerStyle: {
                backgroundColor:"#f9fafd",
                shadowColor: "#f9fafd",
                elevation: 0
              }
            })}/>
        <HomeStack.Screen name="Home" component={TabsScreen} options = {{
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "#2e64e5",
            fontSize: 18
          },
          headerTitle:"Social App",
          headerStyle:{
            shadowColor: "fff",
            elevation: 0,
          },
        }}
        />
        <HomeStack.Screen name="Post" component={PostScreen}/>
        <HomeStack.Screen name="Camera" component={Camerapicker}/>
        </HomeStack.Navigator>
    )
    
    export default RootStackScreen;


const TabsScreen = () => (

  <Tabs.Navigator
    initialRouteName='Home'
    >
            <Tabs.Screen name="Home" component={HomeScreen} options={({route}) => ({
              tabBarIcon: ({color, size}) => (
                <FontAwesome
                name="home"
                color={"grey"}
                size={20}
                />
              )
            })}/>
            <Tabs.Screen name="Chats" component={ChatScreen} options={({route}) => ({
              tabBarIcon: ({color, size}) => (
                <FontAwesome
                name="wechat"
                color={"grey"}
                size={20}
                />
              )
            })}/>
            <Tabs.Screen name="Profile" component={ProfileScreen} options={({route}) => ({
              tabBarIcon: ({color, size}) => (
                <FontAwesome
                name="user"
                color={"grey"}
                size={20}
                />
              )
            })}/>
    </Tabs.Navigator> 
)
export {TabsScreen};

