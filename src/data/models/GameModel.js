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
    this.computeLegalMoves();
  }

  toggleTurn() {
    this.turn = this.turn == PieceModel.BLACK ? PieceModel.WHITE : PieceModel.BLACK;
  }

  movePiece(fromKey, toKey) {
    let fromPiece = this.board.map[fromKey];
    if (fromPiece.color !== this.turn) return;
    let toPiece = this.board.map[toKey];
    this._pushHistory();
    this.board.movePiece(fromKey, toKey);
    if (this.board.isInCheck(this.turn)) {
      console.log("moved into check");
      this.undoMove();
      return false;
    } else {
      this.future = [];
    }
    this.toggleTurn();
    this.isInCheck = this.board.isInCheck(this.turn);
    if (this.isInCheck) {
      console.log("checked opponent");
    }
    if (!toPiece.isEmpty()) {
      if (toPiece.color == this.player1.color) {
        this.player1.score -= toPiece.getValue();
      } else {
        this.player2.score -= toPiece.getValue();
      }
    }
    return true;
  }


  undoMove() {
    if (this.history.length < 1) return;
    this._pushFuture();
    this._popHistory();
    this.toggleTurn();
  }

  redoMove() {
    if (this.future.length < 1) return;
    this._pushHistory();
    this._popFuture();
    this.toggleTurn();
  }

  toJSON() {
    let jsonString = JSON.stringify({
      map: this.board.cloneMap(),
      player1: this.player1.toJSON(),
      player2: this.player2.toJSON(),
      legalMoves: this.legalMoves
    });
    return JSON.parse(jsonString);
  }

  fromJSON(json) {
    let {
      map,
      player1,
      player2,
      legalMoves
    } = json;
    this.board.setMap(map);
    this.player1.fromJSON(player1);
    this.player2.fromJSON(player2);
    this.legalMoves = legalMoves;
  }

  _pushHistory() {
    this.history.push(this.toJSON());
  }

  _popHistory() {
    let json = this.history.pop();
    this.fromJSON(json);
  }

  _pushFuture() {
    this.future.push(this.toJSON())
  }

  _popFuture() {
    let { map } = this.future.pop();
    this.board.setMap(map);
  }

  _addLegalMove(fromKey, toKey) {
    this.legalMoves.push({fromKey, toKey})
  }

  computeLegalMoves() {
    this.legalMoves = [];
    let allMoves = this.board.getAllMoves(this.turn);
    for (let key in allMoves) {
      let moves = allMoves[key];
      for (let j in moves) {
        let toKey = moves[j];
        if (this.movePiece(key,toKey)) {
          this._addLegalMove(key, toKey)
          this.undoMove();
        }
      }
    }
  }

  isCheckMate() {
    console.log("legalMoves", this.legalMoves);
    let hasCheck = false;
    let colors = [PieceModel.WHITE, PieceModel.BLACK];
    for (let i in colors) {
      let color = colors[i];
      if (!this.board.isInCheck(color)) {
        continue;
      }
      console.log("isInCheck", color);
      let allMoves = this.board.getAllMoves(color);
      hasCheck = true;
      for (let key in allMoves) {
        let moves = allMoves[key];
        for (let j in moves) {
          let toKey = moves[j];
          if (this.movePiece(key,toKey)) {
            this.undoMove();
            hasCheck = false;
          }
        }
      }
    }
    !hasCheck && this.computeLegalMoves();
    return hasCheck;
  }
}
