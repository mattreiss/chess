import PieceModel from './PieceModel';

export default class BoardModel {
  static ROWS = '12345678';
  static COLS = 'abcdefgh';



  constructor() {
    this.map = {};
    this.iterate((row, col) => {
        let key = col + row;
        let val = this.getInitialPiece(col, row);
        this.map[key] = val;
    })
  }

  iterate(cb) {
    for (let i = 0; i < BoardModel.ROWS.length; i++) {
      for (let j = 0; j < BoardModel.COLS.length; j++) {
          let col = BoardModel.COLS[j];
          let row = BoardModel.ROWS[i];
          if (typeof cb === 'function') {
            cb(row, col);
          }
      }
    }
  }

  getInitialPiece(col, row) {
    let {
      ROOK,
      KNIGHT,
      BISHOP,
      QUEEN,
      KING,
      POND,
      WHITE,
      BLACK
    } = PieceModel
    if (row >= 3 && row <= 6) return new PieceModel();
    if (row == 2) return new PieceModel(POND, WHITE);
    if (row == 7) return new PieceModel(POND, BLACK);
    switch(col + row) {
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
}
