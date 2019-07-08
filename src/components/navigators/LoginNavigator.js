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

const StackScreens = {
  Login: { screen: Screens.LoginScreen },
  Signup: { screen: Screens.SignupScreen },
};

const StackOptions = {
  headerMode: 'none'
};

const StackNavigator = createStackNavigator(StackScreens, StackOptions);
export default createAppContainer(StackNavigator);
