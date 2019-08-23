export default class PieceModel {
  static ROOK = 'r';
  static KNIGHT = 'h';
  static BISHOP = 'b';
  static QUEEN = 'q';
  static KING = 'k';
  static POND = 'p';
  static EMPTY = ' ';

  static WHITE = 1;
  static BLACK = 0;

  constructor(name = PieceModel.EMPTY, color = '') {
    this.name = name;
    this.color = color;
    this.value = this.getValue();
  }

  getValue() {
    switch(this.name) {
      case PieceModel.EMPTY: return 0;
      case PieceModel.POND: return 1;
      case PieceModel.KNIGHT:
      case PieceModel.BISHOP: return 3;
      case PieceModel.ROOK: return 5;
      case PieceModel.QUEEN: return 9;
      case PieceModel.KING: return 4;
    }
  }

  isEmpty() {
    return this.name === PieceModel.EMPTY;
  }

  isWhite() {
    return this.color === PieceModel.WHITE;
  }
}
