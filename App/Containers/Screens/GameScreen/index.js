import React, { Component } from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import { Board } from '../../../Components'
import { Images } from '../../../Themes'
import styles from './style'

export default class LaunchScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Chess Game`,
  });

  render () {
    return (
      <View style={styles.mainContainer}>
        <Board />
      </View>
    )
  }
}
