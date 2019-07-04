import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { ScreenStyle } from './styles';

const Styles = StyleSheet.create(ScreenStyle);

export default class Screen extends React.Component {

  render() {
    return (
      <View style={Styles.container} {...this.props}>
        {this.props.children}
      </View>
    );
  }

}
