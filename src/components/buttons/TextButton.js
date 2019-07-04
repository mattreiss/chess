import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';
import { TextButtonStyle } from './styles';

const Styles = StyleSheet.create(TextButtonStyle);

export default class TextButton extends React.Component {

  render() {
    let { text } = this.props;
    return (
      <TouchableOpacity {...this.props}>
        <Text style={Styles.text}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  }

}
