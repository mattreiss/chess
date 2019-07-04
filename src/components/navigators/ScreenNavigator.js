import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { Colors, Sizes, Languages } from '../../constants';
import * as Screens from '../screens';
import { ScreenNavigatorStyle } from './styles';

const Styles = StyleSheet.create(ScreenNavigatorStyle);

const mapStateToProps = (state) => {
  // let { language } = state.main;
  let { screen, screenProps } = state.navigate;
  return {
    // main: { language },
    navigate: { screen, screenProps }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class ScreenNavigator extends React.Component {
  render() {
    let { screen, screenProps } = this.props.navigate;
    console.log("screen nav", screen);
    let ScreenComponent = Screens[screen];
    if (ScreenComponent) {
      return <ScreenComponent screenProps={screenProps} />
    }
    return (
      <View style={Styles.container}>
        <Text style={Styles.text}>
          Invalid Screen {screen}!
        </Text>
      </View>
    );
  }
}
