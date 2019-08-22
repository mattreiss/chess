import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { MainActions } from '../../data/redux/actions';
import { BoardModel } from '../../data/models';
import { Colors, Sizes, Languages } from '../../constants';
import { BoardView } from '../views';
import { TextButton } from '../buttons';
import { GameScreenStyle } from './styles';

const Styles = StyleSheet.create(GameScreenStyle);

const mapStateToProps = (state) => {
  let { language } = state.main;
  return {
    main: { language },
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
    boardModel: new BoardModel()
  }

  render() {
    let { language } = this.props.main;
    let { boardModel } = this.state;
    return (
      <View style={Styles.container}>
        <BoardView boardModel={boardModel} />
      </View>
    );
  }

}
