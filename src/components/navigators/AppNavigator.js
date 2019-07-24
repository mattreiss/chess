import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform
} from 'react-native';
import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import * as Screens from '../screens';
import DrawerNavigator from './DrawerNavigator';
import TabNavigator from './TabNavigator';

console.log("Platform.OS", Platform.OS);

const getNavigatorForPlatform = () => {
  switch (Platform.OS) {
    case "ios": return TabNavigator;
    case "android":
    case "web":
    default: return DrawerNavigator;
  }
}

const StackScreens = {
  Main: { screen: getNavigatorForPlatform() },
  Camera: { screen: Screens.CameraScreen },
};

const StackOptions = {
  headerMode: 'none'
}

const StackNavigator = createStackNavigator(StackScreens, StackOptions);
export default createAppContainer(StackNavigator);
