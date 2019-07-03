import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Colors, Sizes, Languages } from '../../constants';
import { MainScreenStyle } from './styles';

const Styles = StyleSheet.create(MainScreenStyle);

class MainScreen extends React.Component {

  render() {
    return (
      <View style={Styles.container}>
        <Text style={Styles.text}>
          {Languages.helloText} MainScreen!
        </Text>
      </View>
    );
  }

}

export default MainScreen;
