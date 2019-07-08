import React from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View
} from 'react-native';
import {
  createDrawerNavigator,
  createAppContainer,
  DrawerItems,
  SafeAreaView
} from 'react-navigation';
import { Colors, Sizes, Languages } from '../../constants';
import * as Screens from '../screens';

const DrawerScreens = {
  Main: { screen: Screens.MainScreen },
  Home: { screen: Screens.HomeScreen }
};

const DrawerComponent = props => (
  <ScrollView>
    <SafeAreaView
      style={{flex: 1}}
      forceInset={{ top: 'always', horizontal: 'never' }}>
      <DrawerItems {...props} />
      <View>
        <Text>Custom Drawer Text</Text>
      </View>
    </SafeAreaView>
  </ScrollView>
)

const DrawerOptions = {
  contentComponent: DrawerComponent,
  contentOptions: {
    activeTintColor: Colors.primary,
    itemsContainerStyle: {
      marginVertical: 0,
    },
    iconContainerStyle: {
      opacity: 1
    }
  }
}

const DrawerNavigator = createDrawerNavigator(DrawerScreens, DrawerOptions);
export default createAppContainer(DrawerNavigator);
