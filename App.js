import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from "./navigation/drawer";

import HomePage from "./screens/homepage";
import TodaysEvents from "./screens/todaysevents";
import CreateEvent from "./screens/createevent";
import firebase from 'firebase';
import {firebaseConfig} from './config'


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


export default function App() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}

