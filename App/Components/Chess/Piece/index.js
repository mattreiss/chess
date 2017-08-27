import React, { Component } from 'react'
import { Text, TouchableOpacity, Image, View } from 'react-native'
import { PIECES } from '../../../Constants'
import styles from './style'

const imgPath = "Images/chess/";

class Piece extends Component {
  render () {
    let {piece, isBlack} = this.props;
    let img;
    switch(piece) {
      case PIECES.pawn: img = 'pawn'; break;
      case PIECES.rook: img = 'rook'; break;
      case PIECES.horse: img = 'horse'; break;
      case PIECES.bishop: img = 'bishop'; break;
      case PIECES.queen: img = 'queen'; break;
      case PIECES.king: img = 'king'; break;
    }
    if (!img) return <View></View>;
    img += isBlack ? "-black.png" : "-white.png";
    return (
      <Image style={this.props.style} source={{uri: imgPath + img}} />
    )
  }
}

export default Piece
