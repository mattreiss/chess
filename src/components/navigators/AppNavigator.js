import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import * as Screens from '../screens';
import DrawerNavigator from './DrawerNavigator';

const StackScreens = {
  Main: { screen: DrawerNavigator },
  Camera: { screen: Screens.CameraScreen },
};

const StackOptions = {
  headerMode: 'none'
}

const StackNavigator = createStackNavigator(StackScreens, StackOptions);
export default createAppContainer(StackNavigator);
