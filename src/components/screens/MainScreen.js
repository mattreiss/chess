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

  componentDidMount() {
    console.log("MainScreen mounted");
  }

  componentWillUnmount() {
    console.log("MainScreen unmounted");
  }

  onDidFocus = (p) => {
    console.log("onDidFocus MainScreen");
  }

  onDidBlur = (p) => {
    console.log("onDidBlur MainScreen");
  }

  render() {
    let { setLanguage } = this.props;
    let { language } = this.props.main;
    let { navigate, openDrawer, closeDrawer } = this.props.navigation;
    return (
      <Screen
        style={Styles.container}
        onDidFocus={this.onDidFocus}
        onDidBlur={this.onDidBlur}>
        <TextButton
          onPress={() => navigate("Home", {testProp: 'It worked!'})}
          text={Languages[language].helloText + " MainScreen"}/>

        <TextButton
          onPress={() => navigate("Camera")}
          text="Camera"/>

        <TextButton
          onPress={() => navigate("Logout")}
          text="Logout"/>

        <TextButton
          onPress={openDrawer}
          text="Open Drawer"/>

        <TextButton
          onPress={() => setLanguage("en")}
          text="English"/>

        <TextButton
          onPress={() => setLanguage("es")}
          text="Spanish"/>

        <TextButton
          onPress={() => setLanguage("it")}
          text="Italian"/>

        <TextButton
          onPress={() => setLanguage("fr")}
          text="French"/>
      </Screen>
    );
  }

}
