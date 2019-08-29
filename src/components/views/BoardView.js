import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Colors, Sizes, Languages } from '../../constants';
import { Screen } from '../views';
import { TextButton } from '../buttons';
import { BoardViewStyle } from './styles';

const Styles = StyleSheet.create(BoardViewStyle);

export default class BoardView extends React.Component {

  state = {
    selection: null,
    selectionMoves: {}
  }

  onPressSquare = (key) => {
    let { boardModel, movePiece } = this.props;
    let { selection, selectionMoves } = this.state;
    if (selectionMoves[key] && typeof movePiece == 'function') {
      movePiece(selection, key);
      this.setState({selection: null, selectionMoves: {}});
      return;
    }
    let moves = boardModel.getMoves(key);
    selectionMoves = {};
    moves.forEach(move => selectionMoves[move] = true);
    selection = key;
    this.setState({selection, selectionMoves});
  }

  renderSquare(key) {
    let { boardModel } = this.props;
    let { selection, selectionMoves } = this.state;
    let pieceModel = boardModel.map[key];
    let { name, color } = pieceModel;
    let style = Styles.square;
    if (selection == key) style = Styles.squareSelection;
    if (selectionMoves[key]) style = Styles.squareMove;
    return (
      <TextButton
        key={key}
        style={style}
        text={name + color + ' ' + key}
        onPress={() => this.onPressSquare(key)}
      />
    )
  }

  renderSquares() {
    let { boardModel, flipped } = this.props;
    let squares = [];
    let rows = [];
    // console.log("render squares",flipped)
    boardModel.forEach(({row, col}) => {
      let key = boardModel.genKey({row, col});
      let square = this.renderSquare(key);
      flipped ? squares.unshift(square) : squares.push(square);
      if (squares.length == 8) {
        let renderedRow = (
          <View key={row} style={Styles.row}>
            {squares}
          </View>
        );
        flipped ? rows.push(renderedRow) : rows.unshift(renderedRow);
        squares = [];
      }
    })
    return rows;
  }

  render() {
    let { boardModel } = this.props;
    // console.log("BoardView render boardModel", boardModel);
    return (
      <View style={Styles.container}>
        {this.renderSquares()}
      </View>
    );
  }

}
