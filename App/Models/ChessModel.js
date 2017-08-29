import { PIECES } from '../Constants';

const cols = ['h', 'g', 'f', 'e', 'd', 'c', 'b', 'a'];
const rows = ['1', '2', '3', '4', '5', '6', '7', '8'];

const pieceObject = (piece, isBlack) => {
  return {piece, isBlack};
}

const getKey = (row, col) => col + "" + row;
const getValue = (row, col) => {
  switch (row) {
    case '2': return pieceObject(PIECES.pawn, true);
    case '7': return pieceObject(PIECES.pawn, false);
    case '1':
      switch (col) {
        case 'a': return pieceObject(PIECES.rook, true);
        case 'b': return pieceObject(PIECES.horse, true);
        case 'c': return pieceObject(PIECES.bishop, true);
        case 'h': return pieceObject(PIECES.rook, true);
        case 'g': return pieceObject(PIECES.horse, true);
        case 'f': return pieceObject(PIECES.bishop, true);
      }
    case '8':
      switch (col) {
        case 'a': return pieceObject(PIECES.rook, false);
        case 'b': return pieceObject(PIECES.horse, false);
        case 'c': return pieceObject(PIECES.bishop, false);
        case 'h': return pieceObject(PIECES.rook, false);
        case 'g': return pieceObject(PIECES.horse, false);
        case 'f': return pieceObject(PIECES.bishop, false);
      }
  }
  switch(getKey(row, col)) {
    case 'd1': return pieceObject(PIECES.queen, true);
    case 'd8': return pieceObject(PIECES.queen, false);
    case 'e1': return pieceObject(PIECES.king, true);
    case 'e8': return pieceObject(PIECES.king, false);
  }
  return pieceObject(PIECES.none, false);
}

export default class ChessModel {
  constructor(obj = {}) {
    this.map = obj;
    this.lastMove = {};
    this.removeOnMove = {}
    if (obj.a1) return;
    console.log("constructing new chess model map", rows, cols);
    rows.forEach(row => {
      cols.forEach(col => {
        let key = getKey(row, col);
        let value = getValue(row, col);
        this.map[key] = value;
      })
    })
  }

  isEmpty() {
    return this.map && this.map !== {};
  }

  containsIndex(i, j) {
    return (i >= 0 && i < rows.length && j >= 0 && j < cols.length);
  }

  getKeyAt(i, j) {
    if (!this.containsIndex(i, j)) return;
    let row = rows[i];
    let col = cols[j];
    return getKey(row, col);
  }

  getPieceAt(i, j) {
    if (!this.containsIndex(i, j)) return;
    let key = this.getKeyAt(i, j);
    return this.map[key];
  }

  setPieceAt(i, j, piece) {
    if (!this.containsIndex(i, j)) return;
    let key = this.getKeyAt(i, j);
    this.map[key] = piece;
  }

  isEmptyAt(i,j) {
    if (!this.containsIndex(i,j)) return false;
    let { piece } = this.getPieceAt(i, j);
    return piece == PIECES.none;
  }

  movePiece(fromI, fromJ, toI, toJ, piece) {
    this.setPieceAt(fromI, fromJ, {piece: PIECES.none})
    this.setPieceAt(toI, toJ, piece)
    this.lastMove = {fromI, fromJ, toI, toJ, piece: piece.piece};
    console.log("removeOnMove", this.removeOnMove, this.map);
    if (this.removeOnMove.i && this.removeOnMove.j) {
      this.setPieceAt(this.removeOnMove.i, this.removeOnMove.j, {piece: PIECES.none});
      this.removeOnMove = {};
    }
    return this.lastMove;
  }

  copy() {
    let mapCopy = Object.assign({}, this.map);
    return JSON.parse(JSON.stringify(mapCopy));
  }

  canAttack(i, j, isBlack) {
    var next = this.getPieceAt(i, j);
    return (next && next.isBlack != isBlack)
  }

  getPawnMoves(i,j,isBlack) {
    let moves = [];
    let newI = isBlack ? i + 1 : i - 1;
    let newI2 = isBlack ? i + 2 : i - 2;
    this.isEmptyAt(newI, j) && moves.push({i: newI, j});
    this.isEmptyAt(newI, j) && this.isEmptyAt(newI2, j) && (i == 6 || i == 1) && moves.push({i: newI2, j});
    !this.isEmptyAt(newI, j-1) && this.containsIndex(newI, j-1) && moves.push({i: newI, j: j-1});
    !this.isEmptyAt(newI, j+1) && this.containsIndex(newI, j+1) && moves.push({i: newI, j: j+1});
    if (
      this.lastMove
      && this.lastMove.piece == PIECES.pawn
      && Math.abs(this.lastMove.fromI - i) == 2
      && this.lastMove.toI == i
      && (this.lastMove.fromI == 6 || this.lastMove.fromI == 1)) {
        let isLeft = this.lastMove.toJ == j - 1
        let newJ = isLeft ? j - 1 : j + 1;
        moves.push({i: newI, j: newJ, lastMove: this.lastMove}); //de passant
    }

    return moves;
  }

  getRookMoves(i,j,isBlack) {
    let moves = [];
    var row;
    var col;

    // up
    for (row = i + 1; row < rows.length && this.isEmptyAt(row, j); row++) moves.push({i: row, j})
    if (this.canAttack(row, j, isBlack)) moves.push({i: row, j})
    // down
    for (row = i - 1; row >= 0 && this.isEmptyAt(row, j); row--) moves.push({i: row, j})
    if (this.canAttack(row, j, isBlack)) moves.push({i: row, j})
    // left
    for (col = j - 1; col >= 0 && this.isEmptyAt(i, col); col--) moves.push({i, j: col})
    if (this.canAttack(i, col, isBlack)) moves.push({i, j: col})
    // right
    for (col = j + 1; col < cols.length && this.isEmptyAt(i, col); col++) moves.push({i, j: col})
    if (this.canAttack(i, col, isBlack)) moves.push({i, j: col})

    return moves;
  }

  getHorseMoves(i,j,isBlack) {
    let moves = [];
    let spaces = [
      {row: i + 2, col: j - 1},
      {row: i + 2, col: j + 1},
      {row: i - 2, col: j - 1},
      {row: i - 2, col: j + 1},
      {row: i + 1, col: j - 2},
      {row: i + 1, col: j + 2},
      {row: i - 1, col: j - 2},
      {row: i - 1, col: j + 2}
    ];
    spaces.forEach(({row,col}) => {
      if (this.isEmptyAt(row, col) || this.canAttack(row, col)) moves.push({i: row, j: col})
    })
    return moves;
  }

  getBishopMoves(i,j,isBlack) {
    let moves = [];
    return moves;
  }

  getQueenMoves(i,j,isBlack) {
    return this.getRookMoves(i,j,isBlack).concat(this.getBishopMoves(i,j,isBlack));
  }

  getKingMoves(i,j,isBlack) {
    let moves = [];
    return moves;
  }

  getValidMoves(i, j) {
    let { piece, isBlack } = this.getPieceAt(i, j);
    let moves = []
    let validMoves = [];
    switch (piece)
    {
      case PIECES.none: return [];
      case PIECES.pawn: moves = this.getPawnMoves(i,j,isBlack); break;
      case PIECES.rook: moves = this.getRookMoves(i,j,isBlack); break;
      case PIECES.horse: moves = this.getHorseMoves(i,j,isBlack); break;
      case PIECES.bishop: moves = this.getBishopMoves(i,j,isBlack); break;
      case PIECES.queen: moves = this.getQueenMoves(i,j,isBlack); break;
      case PIECES.king: moves = this.getKingMoves(i,j,isBlack); break;
    }
    console.log("moves available", moves, i, j, isBlack);
    moves.forEach(move => {
      let toPiece = this.getPieceAt(move.i, move.j);
      if (toPiece && (toPiece.piece == PIECES.none || toPiece.isBlack != isBlack))
      {
      // TODO check if move is in correct direction / distance for the piece
      // TODO check if another piece blocks the moves
      // TODO check if the move puts you into check
      // TODO check if the move is special(castle, la possainte)
        validMoves.push(move);
      }
    });
    console.log("valid moves", validMoves)
    return validMoves;
  }

  isMoveValid(fromI, fromJ, toI, toJ) {
    let isValid = false;
    this.getValidMoves(fromI, fromJ).forEach(move => {
      console.log("compare move", move, toI, toJ);
      if (move.i == toI && move.j == toJ) {
        isValid = true;
        console.log("move lastMove", move)
        if (move.lastMove) {
          this.removeOnMove = {i:move.lastMove.toI, j:move.lastMove.toJ};
        }
      }
    })
    return isValid;
  }

}
