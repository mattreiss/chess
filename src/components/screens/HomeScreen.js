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
import { MainScreenStyle } from './styles';

const Styles = StyleSheet.create(MainScreenStyle);

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
export default class MainScreen extends React.Component {

  render() {
    let { language } = this.props.main;
    let { setScreen } = this.props;
    return (
      <Screen>
        <TextButton
          onClick={() => setScreen("LoginScreen")}
          text={Languages[language].helloText + " HomeScreen"}/>
      </Screen>
    );
  }

}
