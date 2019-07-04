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
import { SignupScreenStyle } from './styles';

const Styles = StyleSheet.create(SignupScreenStyle);

const mapStateToProps = (state) => {
  let { language } = state.main;
  let { screen } = state.navigate;
  return {
    main: { language },
    navigate: { screen }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    init: () => dispatch(MainActions.init()),
    setScreen: screen => dispatch(NavigateActions.setScreen(screen))
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class SignupScreen extends React.Component {

  render() {
    let { language } = this.props.main;
    let { setScreen } = this.props;
    return (
      <View style={Styles.container}>
        <TextButton
          onClick={() => setScreen("MainScreen")}
          text={Languages[language].helloText + " SignupScreen"}/>
      </View>
    );
  }

}
