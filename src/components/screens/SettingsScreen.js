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
import { SettingsScreenStyle } from './styles';

const Styles = StyleSheet.create(SettingsScreenStyle);

const mapStateToProps = (state) => {
  let { language } = state.main;
  return {
    main: { language },
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLanguage: lang => dispatch(MainActions.setLanguage(lang)),
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class SettingsScreen extends React.Component {

  render() {
    let { setLanguage } = this.props;
    let { language } = this.props.main;
    let { navigate } = this.props.navigation;
    return (
      <View style={Styles.container}>
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

        <TextButton
          onPress={() => navigate("Main")}
          text="Back"/>
      </View>
    );
  }

}
