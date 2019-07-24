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
import { LoginScreenStyle } from './styles';

const Styles = StyleSheet.create(LoginScreenStyle);

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
export default class LoginScreen extends React.Component {

  componentDidMount() {
    this.props.init();
  }

  render() {
    let { language } = this.props.main;
    let { navigate } = this.props.navigation;
    return (
      <View style={Styles.container}>
        <TextButton
          onPress={() => navigate("Signup")}
          text={"Signup"}/>

        <TextButton
          onPress={() => navigate("App")}
          text={"Login"}/>
      </View>
    );
  }

}
