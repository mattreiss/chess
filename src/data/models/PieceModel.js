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
  }
}
