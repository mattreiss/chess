import { PIECES } from '../Constants';

const cols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const rows = ['8', '7', '6', '5', '4', '3', '2', '1'];

const pieceObject = (piece, isBlack) => {
  return {piece, isBlack};
}

const getKey = (row, col) => col + "" + row;
const getValue = (row, col) => {
  switch (row) {
    case '7': return pieceObject(PIECES.pawn, true);
    case '2': return pieceObject(PIECES.pawn, false);
    case '8':
      switch (col) {
        case 'a': return pieceObject(PIECES.rook, true);
        case 'b': return pieceObject(PIECES.horse, true);
        case 'c': return pieceObject(PIECES.bishop, true);
        case 'h': return pieceObject(PIECES.rook, true);
        case 'g': return pieceObject(PIECES.horse, true);
        case 'f': return pieceObject(PIECES.bishop, true);
      }
    case '1':
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
    case 'd8': return pieceObject(PIECES.queen, true);
    case 'd1': return pieceObject(PIECES.queen, false);
    case 'e8': return pieceObject(PIECES.king, true);
    case 'e1': return pieceObject(PIECES.king, false);
  }
  return pieceObject(PIECES.none, false);
}

export default class ChessModel {
  constructor(obj = {}) {
    this.map = obj;
    this.lastMove = {};
    this.removePieceAt = {}
    if (obj.a1) return;
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

  getIndexAt(key) {
    if (!this.map[key]) return;
    if (key.length < 2) return;
    let col = key.charAt(0);
    let row = key.charAt(1);
    let i = rows.indexOf(row);
    let j = cols.indexOf(col);
    return {i,j};
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
    this.setPieceAt(fromI, fromJ, {piece: PIECES.none, isBlack: false})
    this.setPieceAt(toI, toJ, piece)
    this.lastMove = {fromI, fromJ, toI, toJ, piece: piece.piece};
    if (this.removePieceAt.i && this.removePieceAt.j) {
      this.setPieceAt(this.removePieceAt.i, this.removePieceAt.j, {piece: PIECES.none, isBlack: false});
      this.removePieceAt = {};
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
    !this.isEmptyAt(newI, j-1) && this.canAttack(newI, j-1, isBlack) && moves.push({i: newI, j: j-1});
    !this.isEmptyAt(newI, j+1) && this.canAttack(newI, j+1, isBlack) && moves.push({i: newI, j: j+1});
    if (
      this.lastMove
      && this.lastMove.piece == PIECES.pawn
      && Math.abs(this.lastMove.fromI - i) == 2
      && this.lastMove.toI == i
      && (this.lastMove.fromI == 6 || this.lastMove.fromI == 1)) {
        let isLeft = this.lastMove.toJ == j - 1
        let newJ = isLeft ? j - 1 : j + 1;
        let removePieceAt = {i:this.lastMove.toI, j:this.lastMove.toJ};
        moves.push({i: newI, j: newJ, removePieceAt}); //de passant
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
      if (this.isEmptyAt(row, col) || this.canAttack(row, col, isBlack)) moves.push({i: row, j: col})
    })
    return moves;
  }

  getBishopMoves(i,j,isBlack) {
    let moves = [];
    var row;
    var col;

    row = i + 1;
    col = j + 1;
    while (this.isEmptyAt(row, col)) {
      moves.push({i: row, j: col});
      row++;
      col++;
    }
    if (this.canAttack(row, col, isBlack)) moves.push({i: row, j: col});

    row = i - 1;
    col = j + 1;
    while (this.isEmptyAt(row, col)) {
      moves.push({i: row, j: col});
      row--;
      col++;
    }
    if (this.canAttack(row, col, isBlack)) moves.push({i: row, j: col});

    row = i + 1;
    col = j - 1;
    while (this.isEmptyAt(row, col)) {
      moves.push({i: row, j: col});
      row++;
      col--;
    }
    if (this.canAttack(row, col, isBlack)) moves.push({i: row, j: col});

    row = i - 1;
    col = j - 1;
    while (this.isEmptyAt(row, col)) {
      moves.push({i: row, j: col});
      row--;
      col--;
    }
    if (this.canAttack(row, col, isBlack)) moves.push({i: row, j: col});

    return moves;
  }

  getQueenMoves(i,j,isBlack) {
    return this.getRookMoves(i,j,isBlack).concat(this.getBishopMoves(i,j,isBlack));
  }

  getKingMoves(i,j,isBlack) {
    let moves = [];
    let spaces = [
      {row: i + 1, col: j + 1},
      {row: i + 1, col: j - 1},
      {row: i - 1, col: j + 1},
      {row: i - 1, col: j - 1},
      {row: i + 1, col: j},
      {row: i - 1, col: j},
      {row: i, col: j + 1},
      {row: i, col: j - 1}
    ];
    spaces.forEach(({row,col}) => {
      if (this.isEmptyAt(row, col) || this.canAttack(row, col, isBlack)) moves.push({i: row, j: col})
    })
    return moves;
  }

  getPieceMoves(i, j) {
    let { piece, isBlack } = this.getPieceAt(i, j);
    switch (piece)
    {
      case PIECES.none: return [];
      case PIECES.pawn: return this.getPawnMoves(i,j,isBlack);
      case PIECES.rook: return this.getRookMoves(i,j,isBlack);
      case PIECES.horse: return this.getHorseMoves(i,j,isBlack);
      case PIECES.bishop: return this.getBishopMoves(i,j,isBlack);
      case PIECES.queen: return this.getQueenMoves(i,j,isBlack);
      case PIECES.king: return this.getKingMoves(i,j,isBlack);
    }
  }

  getAllPieceMoves(isBlack, callback) {
    var result = [];
    Object.keys(this.map).forEach(key => {
      let value = this.map[key];
      if (value.isBlack == isBlack) {
        let {i, j} = this.getIndexAt(key);
        let moves = this.getPieceMoves(i, j);
        if (moves && callback) callback(moves);
        moves.forEach(move => result.push(move));
      }
    })
    return result;
  }

  isInCheck(i, j) {
    let king = this.getPieceAt(i, j);
    let isInCheck = false;
    this.getAllPieceMoves(!king.isBlack, (moves) => {
      moves.forEach(move => {
        if (move.i == i && move.j == j) {
          isInCheck = true;
          return true;
        }
      })
    })
    return isInCheck;
  }

  isMoveIntoCheck(fromI, fromJ, toI, toJ, piece, isBlack, kingKey) {
    let mapCopy = this.copy();
    this.movePiece(fromI, fromJ, toI, toJ, {piece, isBlack});
    var {i, j} = this.getIndexAt(kingKey)
    if (piece == PIECES.king) {
      i = toI;
      j = toJ;
    }
    let result = this.isInCheck(i, j);
    this.map = mapCopy;
    return result;
  }

  findKing(isBlack) {
    let result;
    Object.keys(this.map).forEach(key => {
      let value = this.map[key];
      if (value.piece == PIECES.king && value.isBlack == isBlack) {
        result = key;
      }
    })
    return result;
  }

  isGameOver() {
    let blackKing = this.findKing(true);
    let whiteKing = this.findKing(false);
    let blackPos = this.getIndexAt(blackKing);
    let whitePos = this.getIndexAt(whiteKing);
    let isBlackInCheck = this.isInCheck(blackPos.i, blackPos.j);
    let isWhiteInCheck = this.isInCheck(whitePos.i, whitePos.j);
    let canBlackMove = this.getAllValidMoves(true).length;
    let canWhiteMove = this.getAllValidMoves(false).length;
    if (!canBlackMove && isBlackInCheck) return "White Wins";
    if (!canWhiteMove && isWhiteInCheck) return "Black Wins"
    if (!canBlackMove || !canWhiteMove) return "It's a Draw";
  }

  getAllValidMoves(isBlack) {
    let result = [];
    Object.keys(this.map).forEach(key => {
      let value = this.map[key];
      if (value.isBlack == isBlack) {
        let {i, j} = this.getIndexAt(key);
        let moves = this.getValidMoves(i, j);
        moves.forEach(move => result.push(move))
      }
    })
    return result;
  }

  getValidMoves(i, j) {
    let { piece, isBlack } = this.getPieceAt(i, j);
    let moves = []
    let kingKey = this.findKing(isBlack)
    this.getPieceMoves(i, j).forEach(move => {
      if (!this.isMoveIntoCheck(i, j, move.i, move.j, piece, isBlack, kingKey)) moves.push(move);
    });
    return moves;
  }

  isMoveValid(fromI, fromJ, toI, toJ) {
    let isValid = false;
    this.getValidMoves(fromI, fromJ).forEach(move => {
      if (move.i == toI && move.j == toJ) {
        isValid = true;
        if (move.removePieceAt) {
          this.removePieceAt = move.removePieceAt
        }
      }
    })
    return isValid;
  }

}
