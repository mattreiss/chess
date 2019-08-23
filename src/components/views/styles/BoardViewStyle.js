import { Colors, Sizes } from '../../../constants';

let Styles = {};

let size = Sizes.screenWidth;
let cellSize = size / 8;

Styles.container = {
  width: size,
  height: size,
  backgroundColor: Colors.background,
  borderRightWidth: 1,
  borderBottomWidth: 1,
  borderColor: Colors.grey(128)
};

Styles.row = {
  flexDirection: 'row'
}

Styles.square = {
  width: cellSize,
  height: cellSize,
  padding: Sizes.margin.half,
  borderLeftWidth: 1,
  borderTopWidth: 1,
  borderColor: Colors.grey(128)
}

Styles.squareSelection = {
  ...Styles.square,
  backgroundColor: Colors.primary
}

Styles.squareMove = {
  ...Styles.square,
  backgroundColor: Colors.secondary
}

export default Styles;
