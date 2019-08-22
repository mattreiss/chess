import { Colors, Sizes } from '../../../constants';

let Styles = {};

let size = Sizes.screenWidth;
let cellSize = size / 8;

Styles.container = {
  width: size,
  height: size,
  backgroundColor: Colors.background,
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
  borderColor: Colors.secondary
}

export default Styles;
