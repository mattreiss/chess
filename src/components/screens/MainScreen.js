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
  state = {
    count: 0
  };

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

  onPressAdd = () => {
    let count = this.state.count + 1;
    this.setState({count});
  }

  onPressSubtract = () => {
    let count = this.state.count - 1;
    this.setState({count});
  }

  render() {
    let { count } = this.state;
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
          onPress={openDrawer}
          text="Open Drawer"/>

        <View>
          <Text>{count}</Text>
        </View>

        <TextButton
          onPress={this.onPressAdd}
          text="Add"/>

        <TextButton
          onPress={this.onPressSubtract}
          text="Subtract"/>

        <TextButton
          onPress={() => navigate("Settings")}
          text="Settings"/>

        <TextButton
          onPress={() => navigate("Logout")}
          text="Logout"/>

      </Screen>
    );
  }

}
