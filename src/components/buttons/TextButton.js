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
    let { text, onPress, style, textStyle } = this.props;
    return (
      <TouchableOpacity style={style} onPress={onPress}>
        <Text style={[Styles.text, textStyle]}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  }

}
