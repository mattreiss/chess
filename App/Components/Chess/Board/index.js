import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import { ChessModel } from '../../../Models';
import { RoundedButton } from '../../../Components'
import { Colors, Metrics, Fonts } from '../../../Themes/'
import Piece from '../Piece'
import styles from './style'


class Board extends Component {
  constructor(props) {
    super(props);
    let chess = new ChessModel();
    console.log("chess board", chess)
    this.state = {
      chess,
      selected: null,
      history: [],
      lastMove: null
    }
  }

  onPressCell(i, j) {
    let piece = this.state.chess.getPieceAt(i, j);
    console.log("pressed cell", piece, i, j, this.state.selected);
    let selection = { piece, i, j };
    let { chess, selected, history } = this.state;
    if (selected && chess.isMoveValid(selected.i, selected.j, i, j)) {
      history.push(chess.copy());
      console.log("history", history);
      let fromI = selected.i;
      let fromJ = selected.j;
      let toI = i;
      let toJ = j;
      chess.setPieceAt(fromI, fromJ, {piece:'-', isWhite: false})
      chess.setPieceAt(toI, toJ, selected.piece)
      let lastMove = {fromI, fromJ, toI, toJ}
      return this.setState({chess, selected: null, history, lastMove});
    }
    this.setState({selected: selection})
  }

  onPressUndo = () => {
    let { history } = this.state;
    let chess = new ChessModel(history.pop());
    this.setState({history, chess, lastMove: null});
  }

  render () {
    let {selected, history, lastMove} = this.state;
    let cellRows = [];
    for (var i = 0; i < 8; i++) {
      const row = i;
      let cells = [];
      for (var j = 0; j < 8; j++) {
        let { piece, isBlack } = this.state.chess.getPieceAt(i, j);
        const col = j;
        let isCheckered = (i % 2 == 0 && j % 2 == 1) || (j % 2 == 0 && i % 2 == 1);
        let isSelected = selected && selected.i == i && selected.j == j;
        let isLastMove = lastMove && ((lastMove.fromI == i && lastMove.fromJ == j) || (lastMove.toI == i && lastMove.toJ == j));
        var color = isCheckered ? {backgroundColor: Colors.steel} : {};
        if (isLastMove) color = {backgroundColor: Colors.facebook}
        if (isSelected) color = {backgroundColor: Colors.bloodOrange};
        cells.push(
          <TouchableOpacity key={i+""+j} style={[styles.cell, color]} onPress={() => this.onPressCell(row, col)}>
            <Piece piece={piece} isBlack={isBlack} style={styles.cellContent} />
          </TouchableOpacity>
        )
      }
      cellRows.push(<View key={i} style={styles.cellRow}>{cells}</View>)
    }

    cellRows.push(<RoundedButton onPress={this.onPressUndo} key={i} style={styles.cellRow} text="Undo" />)
    return (
      <View style={styles.container}>{cellRows}</View>
    )
  }
}

export default Board
