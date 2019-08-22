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
import { TextButton, IconButton } from '../buttons';
import * as Screens from '../screens';

const DrawerScreens = {
  Main: { screen: Screens.MainScreen, icon: 'settings' },
  Game: { screen: Screens.GameScreen, icon: 'play' },
  Home: { screen: Screens.HomeScreen, icon: 'home' }
};

const DrawerItemComponent = props => {
  let { routeName, icon, onPress, isActive } = props;
  let color = isActive ? Colors.primary : Colors.grey(128);
  return (
    <View style={{flexDirection: 'row', padding: Sizes.margin.base}}>
      <IconButton
        name={icon}
        onPress={onPress}
        size={Sizes.icons.base2}
        color={color}
      />
      <TextButton
        text={routeName}
        onPress={onPress}
        textStyle={{color, fontSize: Sizes.font.base2}}
      />
    </View>
  )
}


const DrawerComponent = props => {
  let {
    navigation,
    activeItemKey
  } = props;
  let drawerItems = [];
  for (let routeName in DrawerScreens) {
    drawerItems.push(
      <DrawerItemComponent
        key={routeName}
        routeName={routeName}
        icon={DrawerScreens[routeName].icon}
        onPress={() => navigation.navigate(routeName)}
        isActive={routeName == activeItemKey}
      />
    );
  }
  return (
    <ScrollView>
      <SafeAreaView
        style={{flex: 1}}
        forceInset={{ top: 'always', horizontal: 'never' }}>
        {drawerItems}
      </SafeAreaView>
    </ScrollView>
  );
}

const DrawerOptions = {
  contentComponent: DrawerComponent,
  contentOptions: {
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
