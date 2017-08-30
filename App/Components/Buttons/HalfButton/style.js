import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../../Themes/'

export default StyleSheet.create({
  container: {
    width: Metrics.screenWidth / 2,
    paddingVertical: Metrics.section,
    backgroundColor: Colors.bloodOrange
  },
  text: {
    marginHorizontal: Metrics.baseMargin,
    textAlign: 'center',
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.regular,
    fontWeight: 'bold',
    color: Colors.snow
  }
})
