import PieceModel from './PieceModel';

export default class BoardModel {
  static ROWS = '12345678';
  static COLS = 'abcdefgh';

  constructor() {
    this.turn = PieceModel.WHITE;
    this.map = {};
    this.forEach(({row, col}) => {
        let key = this.genKey({row, col});
        let val = this.getInitialPiece(key);
        this.map[key] = val;
    })
  }

  forEach(cb) {
    for (let i = 0; i < BoardModel.ROWS.length; i++) {
      for (let j = 0; j < BoardModel.COLS.length; j++) {
          let col = BoardModel.COLS[j];
          let row = BoardModel.ROWS[i];
          if (typeof cb === 'function') {
            cb({row, col});
          }
      }
    }
  }

  getInitialPiece(key) {
    let { row, col } = this.parseKey(key);
    let {
      ROOK,
      KNIGHT,
      BISHOP,
      QUEEN,
      KING,
      POND,
      WHITE,
      BLACK,
      EMPTY
    } = PieceModel
    if (row >= 3 && row <= 6) return new PieceModel(EMPTY);
    if (row == 2) return new PieceModel(POND, WHITE);
    if (row == 7) return new PieceModel(POND, BLACK);
    switch(key) {
      case 'a1':
      case 'h1': return new PieceModel(ROOK, WHITE);
      case 'a8':
      case 'h8': return new PieceModel(ROOK, BLACK);
      case 'b1':
      case 'g1': return new PieceModel(KNIGHT, WHITE);
      case 'b8':
      case 'g8': return new PieceModel(KNIGHT, BLACK);
      case 'c1':
      case 'f1': return new PieceModel(BISHOP, WHITE);
      case 'c8':
      case 'f8': return new PieceModel(BISHOP, BLACK);
      case 'd1': return new PieceModel(QUEEN, WHITE);
      case 'e1': return new PieceModel(KING, WHITE);
      case 'd8': return new PieceModel(QUEEN, BLACK);
      case 'e8': return new PieceModel(KING, BLACK);
    }
  }

  parseKey(key) {
    let col = key[0];
    let row = parseInt(key[1]);
    return {row, col};
  }

  genKey({row, col}) {
    return col + row;
  }

  getTop = (key) => {
    if (!key) return null;
    let { row, col } = this.parseKey(key);
    row++;
    if (row > 8) return null;
    return this.genKey({row, col});
  }

  getLeft = (key) => {
    if (!key) return null;
    let { row, col } = this.parseKey(key);
    let i = BoardModel.COLS.indexOf(col);
    i--;
    if (i < 0) return null;
    col = BoardModel.COLS[i];
    return this.genKey({row, col});
  }

  getRight = (key) => {
    if (!key) return null;
    let { row, col } = this.parseKey(key);
    let i = BoardModel.COLS.indexOf(col);
    i++;
    if (i >= BoardModel.COLS.length) return null;
    col = BoardModel.COLS[i];
    return this.genKey({row, col});
  }

  getBottom = (key) => {
    if (!key) return null;
    let { row, col } = this.parseKey(key);
    row--;
    if (row < 1) return null;
    return this.genKey({row, col});
  }

  getTopLeft = (key) => {
    if (!key) return null;
    let topKey = this.getTop(key);
    if (!topKey) return null;
    return this.getLeft(topKey);
  }

  getTopRight = (key) => {
    if (!key) return null;
    let topKey = this.getTop(key);
    if (!topKey) return null;
    return this.getRight(topKey);
  }

  getBottomLeft = (key) => {
    if (!key) return null;
    let bottomKey = this.getBottom(key);
    if (!bottomKey) return null;
    return this.getLeft(bottomKey);
  }

  getBottomRight = (key) => {
    if (!key) return null;
    let bottomKey = this.getBottom(key);
    if (!bottomKey) return null;
    return this.getRight(bottomKey);
  }

  getMoves(key) {
    let piece = this.map[key];
    switch (piece.name) {
      case PieceModel.EMPTY: return [];
      case PieceModel.POND: return this.getPondMoves(key);
      case PieceModel.KNIGHT: return this.getKnightMoves(key);
      case PieceModel.BISHOP: return this.getBishopMoves(key);
      case PieceModel.ROOK: return this.getRookMoves(key);
      case PieceModel.QUEEN: return this.getQueenMoves(key);
      case PieceModel.KING: return this.getKingMoves(key);
    }
  }

  getPondMoves(key) {
    let { row, col } = this.parseKey(key);
    let piece = this.map[key];
    let moves = [];
    if (piece.isWhite()) {
      let topKey = this.getTop(key);
      if (!topKey) return [];
      let topPiece = this.map[topKey];
      if (topPiece.isEmpty()) {
        moves.push(topKey);
        if (row == 2) {
          let topKey2 = this.getTop(topKey);
          let topPiece2 = this.map[topKey2];
          if (topPiece2.isEmpty()) {
            moves.push(topKey2);
          }
        }
      }
      let topLeftKey = this.getTopLeft(key);
      if (topLeftKey) {
        let topLeftPiece = this.map[topLeftKey];
        if (!topLeftPiece.isEmpty() && topLeftPiece.color !== piece.color) {
          moves.push(topLeftKey);
        }
      }
      let topRightKey = this.getTopRight(key);
      if (topRightKey) {
        let topRightPiece = this.map[topRightKey];
        if (!topRightPiece.isEmpty() && topRightPiece.color !== piece.color) {
          moves.push(topRightKey);
        }
      }
    } else {
        let bottomKey = this.getBottom(key);
        if (!bottomKey) return [];
        let bottomPiece = this.map[bottomKey];
        if (bottomPiece.isEmpty()) {
          moves.push(bottomKey);
          if (row == 7) {
            let bottomKey2 = this.getBottom(bottomKey);
            let bottomPiece2 = this.map[bottomKey2];
            if (bottomPiece2.isEmpty()) {
              moves.push(bottomKey2);
            }
          }
        }
        let bottomLeftKey = this.getBottomLeft(key);
        if (bottomLeftKey) {
          let bottomLeftPiece = this.map[bottomLeftKey];
          if (!bottomLeftPiece.isEmpty() && bottomLeftPiece.color !== piece.color) {
            moves.push(bottomLeftKey);
          }
        }
        let bottomRightKey = this.getBottomRight(key);
        if (bottomRightKey) {
          let bottomRightPiece = this.map[bottomRightKey];
          if (!bottomRightPiece.isEmpty() && bottomRightPiece.color !== piece.color) {
            moves.push(bottomRightKey);
          }
        }
    }
    console.log("pond moves for key", key, moves);
    return moves;
  }

  getKnightMoves(key) {
    let piece = this.map[key];
    let moves = [];
    let keys = [];
    let topKey = this.getTop(key);
    if (topKey) {
      let top2Key = this.getTop(topKey);
      keys.push(this.getRight(top2Key));
      keys.push(this.getLeft(top2Key));
      let topRightKey = this.getRight(topKey);
      keys.push(this.getRight(topRightKey));
      let topLeftKey = this.getLeft(topKey);
      keys.push(this.getLeft(topLeftKey));
    }
    let bottomKey = this.getBottom(key);
    if (bottomKey) {
      let bottom2Key = this.getBottom(bottomKey);
      keys.push(this.getRight(bottom2Key));
      keys.push(this.getLeft(bottom2Key));
      let bottomRightKey = this.getRight(bottomKey);
      keys.push(this.getRight(bottomRightKey));
      let bottomLeftKey = this.getLeft(bottomKey);
      keys.push(this.getLeft(bottomLeftKey));
    }
    keys.forEach(k => {
      if (k != null) {
        let p = this.map[k];
        if (p.isEmpty() || p.color != piece.color) {
          moves.push(k);
        }
      }
    })
    console.log("knight moves for key", key, moves);
    return moves;
  }

  getBishopMoves(key) {
    return this._getMovesFromDirectionFunctions(key, [
      this.getTopLeft,
      this.getTopRight,
      this.getBottomLeft,
      this.getBottomRight
    ]);
  }

  getRookMoves(key) {
    return this._getMovesFromDirectionFunctions(key, [
      this.getTop,
      this.getRight,
      this.getBottom,
      this.getLeft
    ]);
  }

  getQueenMoves(key) {
    return this._getMovesFromDirectionFunctions(key, [
      this.getTop,
      this.getRight,
      this.getBottom,
      this.getLeft,
      this.getTopLeft,
      this.getTopRight,
      this.getBottomLeft,
      this.getBottomRight
    ]);
  }

  _getMovesFromDirectionFunctions(key, directionFunctions, limit) {
    let piece = this.map[key];
    let moves = [];
    let handleKey = (currentKey, nextFunction) => {
      let currentPiece = this.map[currentKey];
      if (!currentPiece.isEmpty()) {
        if (currentPiece.color !== piece.color)  {
          moves.push(currentKey);
        }
        return null;
      }
      moves.push(currentKey);
      return nextFunction(currentKey);
    }
    directionFunctions.forEach(directionFunction => {
      let currentKey = directionFunction(key);
      let i = 0;
      while (currentKey) {
        currentKey = handleKey(currentKey, directionFunction);
        i++;
        if (limit && i >= limit) break;
      }
    })
    console.log("_getMovesFromDirectionFunctions moves for key", key, moves);
    return moves;
  }

  getKingMoves(key) {
    return this._getMovesFromDirectionFunctions(key, [
      this.getTop,
      this.getRight,
      this.getBottom,
      this.getLeft,
      this.getTopLeft,
      this.getTopRight,
      this.getBottomLeft,
      this.getBottomRight
    ], 1);
  }
}
