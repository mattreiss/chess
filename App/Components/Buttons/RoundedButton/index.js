import React, { Component } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import styles from './style'

class RoundedButton extends Component {
  render () {
    return (
      <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
        <Text style={styles.text}>{this.props.text}</Text>
        {this.props.children}
      </TouchableOpacity>
    )
  }
}

export default RoundedButton
