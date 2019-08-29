import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { MainActions } from '../../data/redux/actions';
import {
  BoardModel,
  AccountModel,
  GameModel,
  PieceModel,
  PlayerModel
} from '../../data/models';
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
    gameModel: null,
    isPlayer1: true,
  }

  componentWillMount() {
    this.loadOpponent();
  }

  loadOpponent() {
    setTimeout(() => {
      let oponent = new AccountModel();
      this.startGame(oponent);
    }, 0)
  }

  startGame(oponent) {
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
    let gameModel = new GameModel(player1, player2);
    this.setState({gameModel, isPlayer1});
  }

  movePiece = (selectedKey, toKey) => {
    let { gameModel } = this.state;
    gameModel.movePiece(selectedKey, toKey);
    let isCheckMate = gameModel.isCheckMate();
    if (isCheckMate) {
      console.log("CHECKMATE!");
    }
    this.setState({ gameModel, isCheckMate });
  }

  renderLoading() {
    return <Text>Loading...</Text>;
  }

  render() {
    let { language } = this.props.main;
    let {
      gameModel,
      isPlayer1,
    } = this.state;
    if (gameModel == null) return this.renderLoading();
    return (
      <View style={Styles.container}>
        <BoardView
          boardModel={gameModel.board}
          flipped={!isPlayer1}
          movePiece={this.movePiece}
        />
        <Text>Player1 score: {gameModel.player1.score}</Text>
        <Text>Player2 score: {gameModel.player2.score}</Text>
      </View>
    );
  }

}
