import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation';
// import * as Screens from '../screens';
import LoginNavigator from './LoginNavigator';
import AppNavigator from './AppNavigator';

const SwitchScreens = {
  Logout: { screen: LoginNavigator },
  App: { screen: AppNavigator }
};

const SwitchNavigator = createSwitchNavigator(SwitchScreens);
export default createAppContainer(SwitchNavigator);
