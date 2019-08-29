import BoardModel from './BoardModel';
import PlayerModel from './PlayerModel';
import PieceModel from './PieceModel';

export default class GameModel {
  static MODE_CLASSIC = 1;
  static MODE_ANTI = 2;

  constructor(player1, player2, mode = GameModel.MODE_CLASSIC) {
    this.board = new BoardModel();
    this.turn = PieceModel.WHITE;
    this.player1 = player1;
    this.player2 = player2;
    this.mode = mode;
    this.history = [];
    this.future = [];
  }

  toggleTurn() {
    this.turn = this.turn == PieceModel.BLACK ? PieceModel.WHITE : PieceModel.BLACK;
  }

  movePiece(fromKey, toKey) {
    let fromPiece = this.board.map[fromKey];
    if (fromPiece.color !== this.turn) return;
    let toPiece = this.board.map[toKey];
    if (!toPiece.isEmpty()) {
      if (toPiece.color == this.player1.color) {
        this.player1.score -= toPiece.getValue();
      } else {
        this.player2.score -= toPiece.getValue();
      }
    }
    this.history.push(this.board.cloneMap());
    this.board.movePiece(fromKey, toKey);
    if (this.board.isInCheck(this.turn)) {
      console.log("moved into check");
      this.undoMove();
      return false;
    } else {
      this.future = [];
    }
    this.toggleTurn();
    if (this.board.isInCheck(this.turn)) {
      console.log("checked opponent");
    }
    return true;
  }


  isCheckMate() {
    let colors = [PieceModel.WHITE, PieceModel.BLACK];
    for (let i in colors) {
      let color = colors[i];
      if (this.turn == color) continue;
      if (!this.board.isInCheck(color)) continue;
      let allMoves = this.board.getAllMoves(color);
      console.log("allMoves", allMoves, color);
      for (let key in allMoves) {
        let moves = allMoves[key];
        for (let j in moves) {
          let toKey = moves[j];
          console.log("movePiece", key, toKey);
          if (this.movePiece(key,toKey)) {
            this.undoMove();
            return false;
          }
        }
      }
    }
    return true;
  }

  undoMove() {
    console.log("this.history", this.history);
    this.toggleTurn();
    this.future.push(this.board.cloneMap());
    this.board.setMap(this.history.pop());
  }

  redoMove() {
    if (this.future.length < 1) return;
    this.history.push(this.board.cloneMap());
    this.board.setMap(this.future.pop());
  }

}
