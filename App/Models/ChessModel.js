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

  isMoveValid(fromI, fromJ, toI, toJ) {
    let fromKey = this.getKeyAt(fromI, fromJ);
    let fromPiece = this.map[fromKey];

    let toKey = this.getKeyAt(toI, toJ);
    let toPiece = this.map[toKey];

    if (fromPiece.piece == PIECES.none) return false;
    if (toPiece.piece != PIECES.none) {
      if (toPiece.isBlack == fromPiece.isBlack) return false;
    }
    // TODO check if move is in correct direction / distance for the piece
    // TODO check if another piece blocks the moves
    // TODO check if the move puts you into check
    // TODO check if the move is special(castle, la possainte)
    return true;
  }

}
