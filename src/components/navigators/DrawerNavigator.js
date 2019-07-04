import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  createDrawerNavigator,
  createAppContainer
} from 'react-navigation';
import * as Screens from '../screens';

const DrawerScreens = {};
for (let screen in Screens) {
  switch(screen) {
    case "MainScreen":
    case "HomeScreen":
    case "CameraScreen":
    case "LoginScreen":
    case "SignupScreen":
      DrawerScreens[screen] = { screen: Screens[screen] };
  }
}

const DrawerNavigator = createDrawerNavigator(DrawerScreens);
export default createAppContainer(DrawerNavigator);
