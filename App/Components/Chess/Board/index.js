import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import { ChessModel } from '../../../Models';
import { Colors, Metrics, Fonts } from '../../../Themes/'
import styles from './style'

const imgPath = "Images/chess/";

class Board extends Component {
  constructor(props) {
    super(props);
    let chess = new ChessModel();
    console.log("chess board", chess)
    this.state = {
      chess,
      selected: null
    }
  }

  onPressCell(i, j) {
    let piece = this.state.chess.getPieceAt(i, j);
    console.log("pressed cell", piece, i, j, this.state.selected);
    let selection = { piece, i, j };
    let { chess, selected } = this.state;
    if (selected && chess.isMoveValid(selected.i, selected.j, i, j)) {
      chess.setPieceAt(selected.i, selected.j, {piece:'-', isWhite: false})
      chess.setPieceAt(i, j, selected.piece)
      return this.setState({chess, selected: null});
    }
    this.setState({selected: selection})
  }

  renderPiece(piece, isBlack) {
    let img;
    switch(piece) {
      case 'p': img = 'pawn'; break;
      case 'r': img = 'rook'; break;
      case 'h': img = 'horse'; break;
      case 'b': img = 'bishop'; break;
      case 'q': img = 'queen'; break;
      case 'k': img = 'king'; break;
    }
    if (!img) return;
    img += isBlack ? "-black.png" : "-white.png";
    console.log("img", img)
    return (
      <Image style={styles.cellContent} source={{uri: imgPath + img}} />
    )
  }

  render () {
    let cellRows = [];
    for (var i = 0; i < 8; i++) {
      const row = i;
      let cells = [];
      for (var j = 0; j < 8; j++) {
        let { piece, isBlack } = this.state.chess.getPieceAt(i, j);
        const col = j;
        let isCheckered = (i % 2 == 0 && j % 2 == 1) || (j % 2 == 0 && i % 2 == 1);
        let color = isCheckered ? {backgroundColor: Colors.steel} : {};
        cells.push(
          <TouchableOpacity key={i+""+j} style={[styles.cell, color]} onPress={() => this.onPressCell(row, col)}>
            {this.renderPiece(piece, isBlack)}
          </TouchableOpacity>
        )
      }
      cellRows.push(<View key={i} style={styles.cellRow}>{cells}</View>)
    }
    return (
      <View style={styles.container}>{cellRows}</View>
    )
  }
}

export default Board
