import React, { Component } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import styles from './style'

class Pond extends Component {
  render () {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Text style={styles.text}>A Pond</Text>
      </TouchableOpacity>
    )
  }
}

export default Pond
