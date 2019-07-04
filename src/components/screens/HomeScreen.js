import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { MainActions } from '../../data/redux/actions';
import { Colors, Sizes, Languages } from '../../constants';
import { Screen } from '../views';
import { TextButton } from '../buttons';
import { MainScreenStyle } from './styles';

const Styles = StyleSheet.create(MainScreenStyle);

const mapStateToProps = (state) => {
  let { language } = state.main;
  return {
    main: { language },
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    init: () => dispatch(MainActions.init()),
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MainScreen extends React.Component {

  render() {
    let { language } = this.props.main;
    let { navigate } = this.props.navigation;
    return (
      <Screen>
        <TextButton
          onClick={() => navigate("LoginScreen")}
          text={Languages[language].helloText + " HomeScreen"}/>
      </Screen>
    );
  }

}
