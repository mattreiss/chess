import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  createBottomTabNavigator,
  createAppContainer
} from 'react-navigation';
import { Colors, Sizes, Languages } from '../../constants';
import { IconButton } from '../buttons';
import * as Screens from '../screens';

const TabScreens = {
  Main: { screen: Screens.MainScreen, icon: 'settings' },
  Home: { screen: Screens.HomeScreen, icon: 'home' }
};

const TabOptions = {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      const { icon } = TabScreens[routeName];
      return (
        <IconButton
          name={icon}
          color={tintColor}
          size={Sizes.icons.base}
          onPress={() => navigation.navigate(routeName)}
        />
      );
    },
  }),
  tabBarOptions: {
    activeTintColor: Colors.primary,
    inactiveTintColor: Colors.grey(128),
  },
};

const StackNavigator = createBottomTabNavigator(TabScreens, TabOptions);
export default createAppContainer(StackNavigator);
