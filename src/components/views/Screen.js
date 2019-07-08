import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { NavigationEvents, SafeAreaView } from 'react-navigation';
import { ScreenStyle } from './styles';

const Styles = StyleSheet.create(ScreenStyle);

export default class Screen extends React.Component {

  render() {
    let {
      onWillFocus,
      onDidFocus,
      onWillBlur,
      onDidBlur,
      style
    } = this.props;
    return (
      <View style={[Styles.container, style]}>
        <NavigationEvents
          onWillFocus={onWillFocus}
          onDidFocus={onDidFocus}
          onWillBlur={onWillBlur}
          onDidBlur={onDidBlur}
        />
        <SafeAreaView>
          {this.props.children}
        </SafeAreaView>
      </View>
    );
  }

}
