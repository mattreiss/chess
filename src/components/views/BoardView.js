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

  onClickSquare = (key, pieceModel) => {
    console.log("clicked square", key, pieceModel)
  }

  renderSquare(key, pieceModel) {
    let { name, color } = pieceModel;
    return (
      <TextButton
        key={key}
        style={Styles.square}
        text={name + color}
        onClick={() => this.onClickSquare(key, pieceModel)}
      />
    )
  }

  renderSquares() {
    let { boardModel } = this.props;
    let squares = [];
    let rows = [];
    boardModel.iterate((row, col) => {
      let key = col + row;
      let pieceModel = boardModel.map[key];
      let square = this.renderSquare(key, pieceModel);
      squares.push(square);
      if (squares.length == 8) {
        rows.push(
          <View key={row} style={Styles.row}>
            {squares}
          </View>
        );
        squares = [];
      }
    })
    return rows;
  }

  render() {
    let { boardModel } = this.props;
    console.log("BoardView render boardModel", boardModel);
    return (
      <View style={Styles.container}>
        {this.renderSquares()}
      </View>
    );
  }

}
