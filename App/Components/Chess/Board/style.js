import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../../Themes/'

const size = Metrics.screenWidth;
const cellSize = size / 8;
const cellPadding = Metrics.baseMargin;
const cellBorder = 1;
export default StyleSheet.create({
  container: {
    width: size,
    height: size,
    backgroundColor: Colors.ricePaper
  },
  cellRow: {
    flexDirection: 'row',
  },
  cell: {
    width: cellSize,
    height: cellSize,
    padding: cellPadding / 2 ,
    borderLeftWidth: cellBorder,
    borderTopWidth: cellBorder,
    borderColor: Colors.ricePaper
  },
  cellContent: {
      width: cellSize - cellPadding - cellBorder,
      height: cellSize - cellPadding - cellBorder,
  }
})
