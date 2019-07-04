import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { NavigateActions, MainActions } from '../../data/redux/actions';
import { Colors, Sizes, Languages } from '../../constants';
import { Screen } from '../views';
import { TextButton } from '../buttons';
import { LoginScreenStyle } from './styles';

const Styles = StyleSheet.create(LoginScreenStyle);

const mapStateToProps = (state) => {
  let { language } = state.main;
  // let { screenProps } = state.navigate;
  return {
    main: { language },
    // navigate: { screenProps }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    init: () => dispatch(MainActions.init()),
    setScreen: screen => dispatch(NavigateActions.setScreen(screen))
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class LoginScreen extends React.Component {

  render() {
    let { language } = this.props.main;
    let { setScreen, screenProps } = this.props;
    console.log("screenProps", screenProps);
    return (
      <View style={Styles.container}>
        <TextButton
          onClick={() => setScreen("CameraScreen")}
          text={Languages[language].helloText + " LoginScreen"}/>
      </View>
    );
  }

}
