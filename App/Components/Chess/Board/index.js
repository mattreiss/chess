import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, Alert } from 'react-native'
import { ChessModel } from '../../../Models';
import { RoundedButton } from '../../../Components'
import { Colors, Metrics, Fonts } from '../../../Themes/'
import Piece from '../Piece'
import styles from './style'


class Board extends Component {
  constructor(props) {
    super(props);
    let chess = new ChessModel();
    this.state = {
      chess,
      selected: null,
      history: [],
      future: [],
      lastMove: null
    }
  }

  onPressCell(i, j) {
    let piece = this.state.chess.getPieceAt(i, j);
    let selection = { piece, i, j };
    let { chess, selected, history } = this.state;
    if (selected && chess.isMoveValid(selected.i, selected.j, i, j)) {
      history.push(chess.copy());
      let lastMove = chess.movePiece(selected.i, selected.j, i, j, selected.piece);
      return this.setState({chess, selected: null, history, future: [], lastMove},
        () => {
          let isGameOver = chess.isGameOver();
          if (isGameOver) {
            Alert.alert("Check Mate", isGameOver, [
              {text: 'New Game', onPress: () => {
                  chess = new ChessModel();
                  this.setState({chess, history: [], future: [], lastMove: null, selected: null});
                }
              }
            ]);
          }
        }
      );
    }
    this.setState({selected: selection})
  }

  onPressUndo = () => {
    let { history, future } = this.state;
    if (history.length < 1) return;
    future.push(this.state.chess.copy());
    let chess = new ChessModel(history.pop());
    this.setState({history, future, chess, lastMove: null});
  }

  onPressRedo = () => {
    let { history, future } = this.state;
    if (future.length < 1) return;
    history.push(this.state.chess.copy());
    let chess = new ChessModel(future.pop());
    this.setState({history, future, chess, lastMove: null});
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
        if (isLastMove) color = {backgroundColor: "rgba(50,100,255,0.5)"}
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
    cellRows.push(<RoundedButton onPress={this.onPressRedo} key={i+1} style={styles.cellRow} text="Redo" />)
    return (
      <View style={styles.container}>{cellRows}</View>
    )
  }
}

export default Board
