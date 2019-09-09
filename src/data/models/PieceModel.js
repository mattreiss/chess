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

  static EMPTY_PIECE = new PieceModel(PieceModel.EMPTY);

  constructor(name = PieceModel.EMPTY, color = '', position = '') {
    this.name = name;
    this.color = color;
    this.position = position;
    this.value = this.getValue();
    this.hasMoved = false;
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

  setPosition(position) {
    this.position = position;
    this.hasMoved = true;
  }

  isEmpty() {
    return this.name === PieceModel.EMPTY;
  }

  isWhite() {
    return this.color === PieceModel.WHITE;
  }
}
