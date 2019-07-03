import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { NavigateActions, MainActions } from '../../data/redux/actions';
import { Colors, Sizes, Languages } from '../../constants';
import { ProfileStyle } from './styles';

const Styles = StyleSheet.create(ProfileStyle);

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
class Profile extends React.Component {

  render() {
    let { language } = this.props.main;
    return (
      <View style={Styles.container}>
        <Text style={Styles.text}>
          {Languages[language].helloText} Profile!
        </Text>
      </View>
    );
  }

}

export default Profile;
