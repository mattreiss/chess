import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { IconButtonStyle } from './styles';

const Styles = StyleSheet.create(IconButtonStyle);

export default class IconButton extends React.Component {
  onPress = () => {
    let { onPress } = this.props;
    if (typeof onPress == 'function') {
      onPress()
    }
  }

  render() {
    let { name, size, color } = this.props
    let prefix = Platform.OS != 'ios' ? 'ios-' : 'md-';
    return (
      <TouchableOpacity
        onPress={this.onPress}
        style={Styles.container}>
        <Ionicons
          style={Styles.icon}
          name={prefix + name}
          size={size}
          color={color} />
      </TouchableOpacity>
    );
  }
}
