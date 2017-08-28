import { PIECES } from '../Constants';

const cols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
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
  getKeyAt(i, j) {
    if (i < 0 || i >= rows.length || j < 0 || j >= cols.length) return;
    let row = rows[i];
    let col = cols[j];
    return getKey(row, col);
  }

  getPieceAt(i, j) {
    let key = this.getKeyAt(i, j);
    return this.map[key];
  }

  setPieceAt(i, j, piece) {
    let key = this.getKeyAt(i, j);
    this.map[key] = piece;
  }

  copy() {
    let mapCopy = Object.assign({}, this.map);
    return mapCopy;
  }

  hasIndex(i, j) {
    return !(i < 0 || i >= rows.length || j < 0 || j >= rows.length);
  }

  isEmptyAt(i,j) {
    if (!this.hasIndex(i,j)) return false;
    let { piece } = this.getPieceAt(i, j);
    return piece == PIECES.none;
  }

  getPawnMoves(i,j,isBlack) {
    let moves = [];
    let newI = isBlack ? i + 1 : i - 1;
    let newI2 = isBlack ? i + 2 : i - 2;
    this.isEmptyAt(newI, j) && moves.push({i: newI, j});
    this.isEmptyAt(newI, j) && this.isEmptyAt(newI2, j) && (i == 6 || i == 1) && moves.push({i: newI2, j});
    !this.isEmptyAt(newI, j-1) && this.hasIndex(newI, j-1) && moves.push({i: newI, j: j-1});
    !this.isEmptyAt(newI, j+1) && this.hasIndex(newI, j+1) && moves.push({i: newI, j: j+1});
    return moves;
  }

  getRookMoves(i,j,isBlack) {
    let moves = [];
    return moves;
  }

  getHorseMoves(i,j,isBlack) {
    let moves = [];
    return moves;
  }

  getBishopMoves(i,j,isBlack) {
    let moves = [];
    return moves;
  }

  getQueenMoves(i,j,isBlack) {
    let moves = [];
    return moves;
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
      if (toPiece.piece == PIECES.none || toPiece.isBlack != isBlack)
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
      if (move.i == toI && move.j == toJ) isValid = true;
    })
    return isValid;
  }

}
