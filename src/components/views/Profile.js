import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Colors, Sizes, Languages } from '../../constants';
import { ProfileStyle } from './styles';

const Styles = StyleSheet.create(ProfileStyle);

export default class Profile extends React.Component {

  render() {
    return (
      <View style={Styles.container}>
        <Text style={Styles.text}>
          Profile
        </Text>
      </View>
    );
  }

}
