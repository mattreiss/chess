import React, { Component } from 'react'
import { Text, TouchableOpacity, Image, View } from 'react-native'
import { PIECES } from '../../../Constants'
import styles from './style'

const imgPath = "Images/chess/";

class Piece extends Component {
  getImage(piece, isBlack) {
    let color = isBlack ? "-black.png" : "-white.png";
    switch(piece) {
      case PIECES.pawn: return 'pawn' + color;
      case PIECES.rook: return 'rook' + color;
      case PIECES.horse: return 'horse' + color;
      case PIECES.bishop: return 'bishop' + color;
      case PIECES.queen: return 'queen' + color;
      case PIECES.king: return 'king' + color;
    }
  }
  render () {
    let {piece, isBlack} = this.props;
    let img = this.getImage(piece, isBlack);
    if (!img) return <View></View>;
    return <Image style={this.props.style} source={{uri: imgPath + img}} />
  }
}

export default Piece
