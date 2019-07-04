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
    setLanguage: lang => dispatch(MainActions.setLanguage(lang)),
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class MainScreen extends React.Component {

  render() {
    let { language } = this.props.main;
    let { navigate, openDrawer, closeDrawer } = this.props.navigation;
    return (
      <Screen>
        <TextButton
          onClick={() => navigate("HomeScreen", {testProp: 'It worked!'})}
          text={Languages[language].helloText + " MainScreen"}/>

        <TextButton
          onClick={openDrawer}
          text="Open Drawer"/>

        <TextButton
          onClick={() => setLanguage("en")}
          text="English"/>

        <TextButton
          onClick={() => setLanguage("es")}
          text="Spanish"/>

        <TextButton
          onClick={() => setLanguage("it")}
          text="Italian"/>

        <TextButton
          onClick={() => setLanguage("fr")}
          text="French"/>
      </Screen>
    );
  }

}
