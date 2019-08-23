import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { MainActions } from '../../data/redux/actions';
import { BoardModel, AccountModel, PieceModel, PlayerModel } from '../../data/models';
import { Colors, Sizes, Languages } from '../../constants';
import { BoardView } from '../views';
import { TextButton } from '../buttons';
import { GameScreenStyle } from './styles';

const Styles = StyleSheet.create(GameScreenStyle);

const mapStateToProps = (state) => {
  let { language } = state.main;
  let { account } = state.user;
  return {
    main: { language },
    user: { account }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    init: () => dispatch(MainActions.init()),
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class GameScreen extends React.Component {
  state = {
    boardModel: new BoardModel(),
    isPlayer1: true,
    loading: true,
    history: []
  }

  componentDidMount() {
    this.loadOpponent();
  }

  loadOpponent() {
    setTimeout(() => {
      let oponent = new AccountModel();
      this.setPlayers(oponent);
      this.setState({loading: false});
    }, 0)
  }

  setPlayers(oponent) {
    let { account } = this.props.user;
    let random = Math.floor((Math.random() * 100) + 1);
    console.log("random", random)
    let isPlayer1 = random % 2 == 0;
    let player1, player2;
    if (isPlayer1) {
      player1 = new PlayerModel(account, PieceModel.WHITE);
      player2 = new PlayerModel(oponent, PieceModel.BLACK);
    } else {
      player1 = new PlayerModel(oponent, PieceModel.WHITE);
      player2 = new PlayerModel(account, PieceModel.BLACK);
    }
    this.setState({player1, player2, isPlayer1});
  }

  movePiece = (selectedKey, toKey) => {
    let {
      boardModel,
      history,
      player1,
      player2
    } = this.state;
    history.push(boardModel.map);
    let selectedPiece = boardModel.map[selectedKey];
    boardModel.map[selectedKey] = new PieceModel(PieceModel.EMPTY);
    let toPiece = boardModel.map[toKey];
    if (!toPiece.isEmpty()) {
      if (toPiece.color == player1.color) {
        player1.score -= toPiece.getValue();
      } else {
        player2.score -= toPiece.getValue();
      }
    }
    boardModel.map[toKey] = selectedPiece;
    this.setState({
      boardModel,
      history,
      player1,
      player2
    })
  }

  render() {
    let { language } = this.props.main;
    let {
      boardModel,
      player1,
      player2,
      isPlayer1,
      loading
    } = this.state;
    return (
      <View style={Styles.container}>
        <BoardView
          boardModel={boardModel}
          flipped={!isPlayer1}
          loading={loading}
          movePiece={this.movePiece}
        />
      </View>
    );
  }

}
