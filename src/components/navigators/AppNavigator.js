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

const StackScreens = {
  Main: { screen: Platform.OS == 'ios' ? TabNavigator : DrawerNavigator },
  Camera: { screen: Screens.CameraScreen },
};

const StackOptions = {
  headerMode: 'none'
}

const StackNavigator = createStackNavigator(StackScreens, StackOptions);
export default createAppContainer(StackNavigator);
