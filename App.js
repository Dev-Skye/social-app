import 'react-native-gesture-handler';

import Providers from "./navigation";
import ChatScreen from './screens/ChatScreen';
import React, {useState, useEffect} from "react";
import ProfileScreen from './screens/ProfileScreen';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { NavigationContainer } from '@react-navigation/native';
import RootStackScreen, { TabsScreen } from './navigation/RootStackScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Tabs = createBottomTabNavigator();

 

export default function App () {
  return (
    
    <NavigationContainer>
    <RootStackScreen/>
    </NavigationContainer>
  )
}

 
    