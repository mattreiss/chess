import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native'
import { RoundedButton, FullButton } from '../../../Components'
import { Images } from '../../../Themes'
import styles from './style'

export default class LaunchScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Welcome ${"User"}!`,
  });

  onPressPlay = () => {
    console.log("start game");
    this.props.navigation.navigate('GameScreen', {})
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <RoundedButton text="Play Chess" onPress={this.onPressPlay} />
      </View>
    )
  }
}
